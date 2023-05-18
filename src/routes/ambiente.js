const express = require('express');
const session = require('express-session');
const routerAuth = express.Router();
const ambienteController = require('../controllers/ambienteController')

routerAuth.use(session({
    secret: 'techideas_secret_key',
    resave: false,
    saveUninitialized: true,
}));

routerAuth.use((req, res, next) => {
    if (req.session.EMAIL_USUARIO != undefined) {
        next();
    } else {
        // not authorized
        res.redirect("/login.html");
    }
});


routerAuth.get("/listar/:idAmbiente", function (req, res) {
    
    ambienteController.listar(req, res);
});
routerAuth.get("/consultaAmbiente/:idUsuario", function (req, res) {
    
    ambienteController.consultaAmbiente(req, res);
});




module.exports = routerAuth;