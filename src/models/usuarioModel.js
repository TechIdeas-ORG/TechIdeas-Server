var database = require("../database/connection")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM tbUsuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultar(idEmpresa){
    var instrucao = `SELECT * FROM tbUsuario WHERE fkEmpresa = ${idEmpresa};`

    return database.executar(instrucao)
}

function entrar(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)
    var instrucao = `
        SELECT * FROM tbUsuario WHERE emailUsuario = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(fkEmpresa, nomeUsuario, emailUsuario, senhaUsuario) {
    var instrucao = `INSERT INTO tbUsuario (fkEmpresa, nomeUsuario, emailUsuario, senhaUsuario) VALUES (${fkEmpresa}, '${nomeUsuario}', '${emailUsuario}', '${senhaUsuario}');`;

    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    consultar
};