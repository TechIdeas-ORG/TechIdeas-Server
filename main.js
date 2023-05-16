process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
const session = require('express-session');
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");
var dashboardRouter = require("./src/routes/dashboard");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(session({
    secret: 'techideas_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/dashboard", dashboardRouter);

app.listen(PORTA, function () {
    console.log(`Servidor Rodando Em: http://localhost:${PORTA} \n
    Ambiente: ${process.env.AMBIENTE_PROCESSO}`);
});