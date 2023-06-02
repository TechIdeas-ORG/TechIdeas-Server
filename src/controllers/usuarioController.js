var usuarioModel = require("../models/usuarioModel");
const bcrypt = require('bcrypt');

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

function consultar(req, res){
    var idEmpresa = req.params.idEmpresa

    if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa está undefined!");
    } else {
        usuarioModel.consultar(idEmpresa)
            .then(
                function (resultado) {                      
                    res.json(resultado);
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
                            console.log(usuario['senhaUsuario'],result);
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

function excluir(req, res){

    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O ID está undefined!");
    } else{
        usuarioModel.excluir(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a exclusão! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function atualizar(req, res){
    var idUsuario = req.params.idUsuario;
    var emailUsuario = req.params.emailUsuario;
    var nomeUsuario = req.params.nomeUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O ID está undefined!");
    } else{
        usuarioModel.atualizar(idUsuario, emailUsuario, nomeUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a atualização! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}


module.exports = {
    entrar,
    cadastrar,
    listar,
    consultar,
    atualizar,
    excluir
}