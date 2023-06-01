const express = require('express');
const ambienteController = require('../controllers/ambienteController')


routerAuth.get("/listar/:idAmbiente", function (req, res) {
    
    ambienteController.listar(req, res);
});
routerAuth.get("/consultaAmbiente/:idUsuario", function (req, res) {
    
    ambienteController.consultaAmbiente(req, res);
});


routerAuth.get("/consultaTodos/:fkUser", (req, res) => {
    ambienteController.consultaTodos(req,res)
})

routerAuth.get("/consultaDia/:idAmbiente/:primeiro_dia/:ultimo_dia", function (req, res) {
    

    ambienteController.consultaDia(req, res);
});
routerAuth.get("/listarDireita/:idUsuario", function (req, res) {
    ambienteController.listarDireita(req, res);
});


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

//Recebendo os dados do html e direcionando para a função atualizar de ambienteController.js
router.post("/atualizar", function (req, res) {
    ambienteController.atualizar(req, res);
})

router.get("/consultar/:idAmbiente", (req, res) => {
    ambienteController.consultar(req,res);
})

// router.post("/autenticar", function (req, res) {
//     ambienteController.entrar(req, res);
// });

module.exports = router;