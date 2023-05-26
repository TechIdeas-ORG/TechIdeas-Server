var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/auth", function (req, res) {
    usuarioController.entrar(req, res);
});

router.get("/consultar/:idEmpresa", function (req, res) {
    usuarioController.consultar(req, res);
});

module.exports = router;