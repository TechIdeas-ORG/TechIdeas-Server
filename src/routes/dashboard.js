const express = require('express');
const routerAuth = express.Router();
const ambienteController = require('../controllers/ambienteController');

routerAuth.get("/", function (req, res) {
    res.redirect("../private/index.html");
});

routerAuth.get("/:idAmbiente", function (req, res) {
    res.redirect("../private/index.html?idAmbiente=" + req.params['idAmbiente']);
});

routerAuth.get("/relatorio/:idAmbiente/:idUsuario", function (req, res) {
    ambienteController.relatorio(req, res);
});

module.exports = routerAuth;