var database = require("../database/connection")

function listar() {
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM tbAmbiente;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(fkEmpresa, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas) {

    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbAmbiente (fkEmpresa, setorAmbiente, nomeAmbiente, descAmbiente, minimoPessoas, mediaPessoas, maximoPessoas) VALUES ('${fkEmpresa}', '${setorAmbiente}', '${ambiente}', '${descAmbiente}', '${minimoPessoas}', '${mediaPessoas}', '${maximoPessoas}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluir(fkEmpresa, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas) {

    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", fkEmpresa, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas)
    var instrucaoExcluir = `
    DELETE FROM tbAmbiente (fkEmpresa, setorAmbiente, nomeAmbiente, descAmbiente, minimoPessoas, mediaPessoas, maximoPessoas) where fkEmpresa = ${identificador}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoExcluir);
    return database.executar(instrucaoExcluir);
}
module.exports = {
    excluir,
    cadastrar,
    listar,
};