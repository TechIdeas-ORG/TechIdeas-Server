var empresaModel = require("../models/empresaModel");
var usuarioModel = require("../models/usuarioModel");
const bcrypt = require('bcrypt');

const saltRounds = 10;

function cadastrar(req, res) {
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var token = req.body.tokenServer;

    if (nomeEmpresa == undefined) {
        res.status(400).send("O nome da sua empresa está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else {
        
        empresaModel.cadastrar(token, nomeEmpresa, cnpj)
            .then(
                function (resultado) {
                    var idEmpresa = resultado.insertId;

                    //CADASTRO DO USUÁRIO
                    bcrypt.hash(senha, saltRounds, (err, senha_criptografada) =>{

                        usuarioModel.cadastrar(idEmpresa, 'Admin', email, senha_criptografada)
                            .then(
                                function (resultado) {
                                    res.status(200).json(resultado);
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
                                //DELETAR O CADASTRO DA EMPRESA?                                
                        );
                    });
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
    }
}

module.exports = {
    cadastrar
}