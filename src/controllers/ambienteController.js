var ambienteModel = require("../models/ambienteModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA ambienteController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    ambienteModel.listar()
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

        ambienteModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
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
    var fkEmpresa = req.body.fkEmpresaServer;
    var ambiente = req.body.ambiente;
    var descAmbiente = req.body.descAmbiente;
    var setorAmbiente = req.body.setorAmbiente;
    var minimoPessoas = req.body.minimoPessoas;
    var mediaPessoas = req.body.mediaPessoas;
    var maximoPessoas = req.body.maximoPessoas;

    // Faça as validações dos valores
    if (ambiente == undefined) {
        res.status(400).send("O nome do ambiente está undefined!");
    } else if (descAmbiente == undefined) {
        res.status(400).send("A descrição do ambiente está undefined!");
    } else if (setorAmbiente == undefined) {
        res.status(400).send("O setor do ambiente está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo ambienteModel.js
        ambienteModel.cadastrar(fkEmpresa, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas)
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
    }
}

function excluir(req, res) {
    var idAmbiente = req.body.identificadorAmbiente;
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var identificadorAmbiente: identificador;

    // Faça as validações dos valores
    if (idAmbiente == undefined) {
        res.status(400).send("O id do ambiente está undefined!");
    } else {
        // Passando o id como parâmetro para ir ao arquivo ambienteModel.js
        ambienteModel.excluir(idAmbiente)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao excluir o ambiente! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idAmbiente = req.body.idAmbiente;
    var ambiente = req.body.ambiente;
    var descAmbiente = req.body.descAmbiente;
    var setorAmbiente = req.body.setorAmbiente;
    var minimoPessoas = req.body.minimoPessoas;
    var mediaPessoas = req.body.mediaPessoas;
    var maximoPessoas = req.body.maximoPessoas;

    // Faça as validações dos valores
    if (idAmbiente == undefined){
        res.status(400).send("O id do ambiente está undefined!");
    } else if (ambiente == undefined) {
        res.status(400).send("O nome do ambiente está undefined!");
    } else if (descAmbiente == undefined) {
        res.status(400).send("A descrição do ambiente está undefined!");
    } else if (setorAmbiente == undefined) {
        res.status(400).send("O setor do ambiente está undefined!");
    } else if (minimoPessoas == undefined) {
        res.status(400).send("O minimo de pessoas para esse ambiente está undefined!");
    } else if (mediaPessoas == undefined) {
        res.status(400).send("A média de pessoas para esse ambiente está undefined!");
    } else if(maximoPessoas == undefined){
        res.status(400).send("O máximo de pessoas para esse ambiente está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo ambienteModel.js
        ambienteModel.atualizar(idAmbiente, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar o ambiente! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function consultar(req, res) {
    var idUsuario = req.params.idAmbiente;
    
    ambienteModel.consultar(idUsuario)
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

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    excluir,
    atualizar,
    consultar
}