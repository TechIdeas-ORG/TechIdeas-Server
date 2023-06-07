process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");
var dashboardRouter = require("./src/routes/dashboard");
const ambienteRouter = require("./src/routes/ambiente")
const emailRouter = require("./src/routes/email");
const tokenRouter = require("./src/routes/token");
const empresaRouter = require("./src/routes/empresa");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/dashboard", dashboardRouter);
app.use("/ambientes", ambienteRouter);
app.use("/ambiente", ambienteRouter);
app.use("/excluir", ambienteRouter);
app.use("/atualizar", ambienteRouter);
app.use("/email", emailRouter);
app.use("/token", tokenRouter);
app.use("/empresa", empresaRouter);


app.listen(PORTA, function () {
    console.log(`Servidor Rodando Em: http://localhost:${PORTA} \n
    Ambiente: ${process.env.AMBIENTE_PROCESSO}`);
});