var express = require("express");
var router = express.Router();

var tokenController = require("../controllers/tokenController");


router.post("/", function (req, res) {
    console.log('Req Token Router')
    tokenController.listar(req, res);
});

module.exports = router;
