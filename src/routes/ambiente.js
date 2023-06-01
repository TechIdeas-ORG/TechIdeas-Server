const express = require('express');
var router = express.Router();
const ambienteController = require('../controllers/ambienteController')


router.get("/listar/:idAmbiente", function (req, res) {
    
    ambienteController.listar(req, res);
});
router.get("/consultaAmbiente/:idUsuario", function (req, res) {
    
    ambienteController.consultaAmbiente(req, res);
});


router.get("/consultaTodos/:fkUser", (req, res) => {
    ambienteController.consultaTodos(req,res)
})

router.get("/consultaDia/:idAmbiente/:primeiro_dia/:ultimo_dia", function (req, res) {
    

    ambienteController.consultaDia(req, res);
});
router.get("/listarDireita/:idUsuario", function (req, res) {
    ambienteController.listarDireita(req, res);
});


router.get("/", function (req, res) {
    ambienteController.testar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de ambienteController.js
router.post("/cadastrar", function (req, res) {
    ambienteController.cadastrar(req, res);
})

//Recebendo os dados do html e direcionando para a função excluir de ambienteController.js
router.post("/excluir", function (req, res) {
    ambienteController.excluir(req, res);
})

//Recebendo os dados do html e direcionando para a função atualizar de ambienteController.js
router.post("/atualizar", function (req, res) {
    ambienteController.atualizar(req, res);
})

router.get("/consultar/:idAmbiente", (req, res) => {
    ambienteController.consultar(req,res);
})


module.exports = router;