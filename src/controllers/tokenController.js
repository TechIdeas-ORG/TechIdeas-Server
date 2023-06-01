var tokenModel = require("../models/tokenModel");

function listar(req, res) {
    var token = req.body.tokenServer;

    if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    }

    tokenModel.listar(token)
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
    listar
}