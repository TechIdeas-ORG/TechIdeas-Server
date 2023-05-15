const express = require('express');
const session = require('express-session');
const routerAuth = express.Router();

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


routerAuth.get("/", function (req, res) {
    res.redirect("../private/index.html");
});

module.exports = routerAuth;