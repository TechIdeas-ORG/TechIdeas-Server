var database = require("../database/connection")

function cadastrar(fkToken, nomeEmpresa, cnpjEmpresa) {
    var instrucao = `
        INSERT INTO tbEmpresa (fkToken, nomeEmpresa, cnpjEmpresa) VALUES (${fkToken}, '${nomeEmpresa}', '${cnpjEmpresa}');
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
}