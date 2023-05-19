const express = require('express');
const routerAuth = express.Router();

routerAuth.get("/", function (req, res) {
    res.redirect("../private/index.html");
});

module.exports = routerAuth;