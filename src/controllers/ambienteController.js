var AmbienteModel = require("../models/ambienteModel");
const bcrypt = require('bcrypt');

const session = require('express-session');

function listar(req, res) {
    var idAmb = req.params.idAmbiente;
    AmbienteModel.listar1(idAmb)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
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

function consultaAmbiente(req, res) {
    var idUsuario = req.params.idUsuario;
    AmbienteModel.buscarAmbientes(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
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
function listarDireita(req, res) {
    var idUsuario = req.params.idUsuario;
    AmbienteModel.listarDireita(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
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
function consultaTodos(req, res) {
    var idUsuario = req.params.fkUser;

    console.log("cheguei no consula todos controller " +idUsuario)
    AmbienteModel.buscarTodos(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
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

function consultaDia(req, res) {
    var primeiro_dia = req.params.primeiro_dia;
    var ultimo_dia = req.params.ultimo_dia;
    var idAmbiente = req.params.idAmbiente;
    AmbienteModel.buscarDia(idAmbiente, primeiro_dia, ultimo_dia)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
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
    listar,
    consultaAmbiente,
    consultaTodos,
    consultaDia,
    listarDireita
}