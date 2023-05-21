var database = require("../database/connection")

function listar(token) {
    var instrucao = `
    SELECT idToken FROM tbToken WHERE tokenHash = '${token}' AND NOT EXISTS (SELECT NULL FROM tbEmpresa WHERE fkToken = idToken);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar
}