var database = require("../database/connection")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)
    var instrucao = `
        SELECT * FROM tbUsuario WHERE emailUsuario = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nomeEmpresa, cnpj, email, senha, token) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresa, cnpj, email, senha, token);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO tbEmpresa (fkToken, nomeEmpresa, cnpjEmpresa) VALUES (3, '${nomeEmpresa}', '${cnpj}');`;

    
    console.log("Executando a instrução SQL: \n" + instrucao);
    var retorno = database.executar(instrucao);
    retorno.then(function(result){
        console.log("Executando a instrução SQL: \n" + instrucao2);
        
        var last_id = result.insertId;
        console.log(last_id);
        var instrucao2 = `INSERT INTO tbUsuario (fkEmpresa, nomeUsuario, emailUsuario, senhaUsuario) VALUES (${last_id},'Admin', '${email}', '${senha}');`;

        return database.executar(instrucao2);

    }).catch(function(){
        console.log(retorno);
        return new Promise((reject)=> {reject("erro")});
    })
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};