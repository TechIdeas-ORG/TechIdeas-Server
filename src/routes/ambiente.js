var express = require("express");
var router = express.Router();

var ambienteController = require("../controllers/ambienteController");

router.get("/", function (req, res) {
    ambienteController.testar(req, res);
});

router.get("/listar", function (req, res) {
    ambienteController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de ambienteController.js
router.post("/cadastrar", function (req, res) {
    ambienteController.cadastrar(req, res);
})

//Recebendo os dados do html e direcionando para a função excluir de ambienteController.js
router.post("/excluir", function (req, res) {
    ambienteController.excluir(req, res);
})

// router.post("/autenticar", function (req, res) {
//     ambienteController.entrar(req, res);
// });

module.exports = router;