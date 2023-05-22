var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");


router.post("/", function (req, res) {
    console.log('Req Empresa Router')
    empresaController.cadastrar(req, res);
});

module.exports = router;
