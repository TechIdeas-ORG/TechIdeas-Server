const express = require('express');
const routerAuth = express.Router();

routerAuth.get("/", function (req, res) {
    res.redirect("../private/index.html");
});

routerAuth.get("/:idAmbiente", function (req, res) {
    res.redirect("../private/index.html?idAmbiente=" + req.params['idAmbiente']);
});

module.exports = routerAuth;