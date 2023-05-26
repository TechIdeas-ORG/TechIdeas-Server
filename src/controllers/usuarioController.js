var usuarioModel = require("../models/usuarioModel");
const bcrypt = require('bcrypt');

const saltRounds = 10;

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.entrar(email)
            .then(
                function (resultado) {
                    var usuario = resultado[0];
                    if((resultado.length-1) == 0){
                        bcrypt.compare(senha, usuario['senhaUsuario'], function(err, result) {
                            if(result){
                                //LOGIN APROVADO                      
                                res.json(usuario);
                            }else{
                                //ERRO
                                res.status(403).send('Email e/ou senha inválido(s)');
                            }
                        });
                    }else if((resultado.length-1) < 0){
                        res.status(403).send('Email e/ou senha inválido(s)');
                    }else{
                        res.status(403).send('Mais de um usuário com o mesmo login e senha! Entre em contato com o suporte!');
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeUsuario = req.body.nomeFuncionarioServer;
    var emailUsuario = req.body.emailServer;
    var senhaUsuario = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (emailUsuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senhaUsuario == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        
        bcrypt.hash(senhaUsuario, saltRounds, (err, senha_criptografada) =>{

            usuarioModel.cadastrar(fkEmpresa, nomeUsuario, emailUsuario, senhaUsuario)
                .then(
                    function (resultado) {
                        res.json(resultado);
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
            );

        });

    }
}

module.exports = {
    entrar,
    cadastrar,
    listar
}