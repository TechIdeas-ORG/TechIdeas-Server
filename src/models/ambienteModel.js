var database = require("../database/connection")

function listar1(idAmbiente) {
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar() \n\n " + idAmbiente);
    var instrucao = `
    select SUM(valMetrica) as soma, HOUR(dateMetrica) as horario 
    from tbMetricas
    join tbSensor on fkSensor = idSensor
    join tbAmbiente on fkAmbiente = idAmbiente
    where idAmbiente =  ${idAmbiente} and DATEDIFF(dateMetrica, now()) < "23:30:00"
    GROUP BY HOUR(dateMetrica)
    order by HOUR(dateMetrica) asc;

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listarDireita(idUsuario) {
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar() \n\n " + idUsuario);
    var instrucao = `
    SELECT SUM(valMetrica) as soma, hour(dateMetrica) as horario from tbMetricas
    join tbSensor on fkSensor = idSensor
    join tbAmbiente on fkAmbiente = idAmbiente
    join tbEmpresa on tbAmbiente.fkEmpresa = idEmpresa
    JOIN tbUsuario on tbUsuario.fkEmpresa = idEmpresa
    WHERE idUsuario = ${Number(idUsuario)} and DATEDIFF(dateMetrica, now()) < "23:30:00"
    group by hour(dateMetrica);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarAmbientes(idUsuario) {
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar() \n\n " + idUsuario);
    var instrucao = `
    select idAmbiente, nomeAmbiente, idUsuario from tbUsuario 
    join tbEmpresa ON tbUsuario.fkEmpresa = idEmpresa
    join tbAmbiente on  tbAmbiente.fkEmpresa = idEmpresa
    WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function buscarTodos(idUsuario) {
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar() \n\n " + idUsuario);
    var instrucao = `
    SELECT count(*) as soma, fkSensor, idAmbiente, HOUR(dateMetrica) as horario, maximoPessoas, minimoPessoas FROM tbMetricas 
    JOIN tbSensor ON fkSensor = idSensor
    JOIN tbAmbiente ON fkAmbiente = idAmbiente
    JOIN tbEmpresa ON tbAmbiente.fkEmpresa = idEmpresa
    JOIN tbUsuario ON tbUsuario.fkEmpresa = idEmpresa
    where HOUR(dateMetrica) = HOUR(NOW()) and idUsuario = ${idUsuario}
    GROUP BY fkSensor, HOUR(dateMetrica),idAmbiente, maximoPessoas, minimoPessoas
    ORDER BY HOUR(dateMetrica);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDia(idAmbiente, primeiro_dia, ultimo_dia) {
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar() \n\n ");
    var instrucao = `
    select SUM(valMetrica) as soma, DAY(dateMetrica) as horario
    from tbMetricas
    join tbSensor on fkSensor = idSensor
    join tbAmbiente on fkAmbiente = idAmbiente
    where idAmbiente = ${idAmbiente} AND DATE_FORMAT(dateMetrica, '%d-%m-%Y') BETWEEN '${primeiro_dia}' AND '${ultimo_dia}'
    GROUP BY DAY(dateMetrica)
    order by DAY(dateMetrica) asc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

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

function excluir(identificadorAmbiente) {

    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", identificadorAmbiente)
    var instrucaoExcluir = `
    DELETE FROM tbAmbiente where idAmbiente = ${identificadorAmbiente};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoExcluir);
    return database.executar(instrucaoExcluir);
}

function atualizar(idAmbiente, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas) {

    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function updateNomeAmbiente():",ambiente);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    UPDATE tbAmbiente SET nomeAmbiente = '${ambiente}', descAmbiente = '${descAmbiente}', setorAmbiente = '${setorAmbiente}', minimoPessoas = ${minimoPessoas}, mediaPessoas = ${mediaPessoas}, maximoPessoas = ${maximoPessoas} where idAmbiente = ${idAmbiente};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultar(usuario){
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function consultar():",usuario);

    var instrucao = `select nomeAmbiente, idAmbiente, descAmbiente, setorAmbiente, idEmpresa from tbUsuario
    join tbEmpresa on idEmpresa = tbUsuario.fkEmpresa
    join tbAmbiente on idEmpresa = tbAmbiente.fkEmpresa
    where idUsuario = ${usuario};`
    

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listar1,
    buscarAmbientes,
    buscarTodos,
    buscarDia,
    listarDireita,
    excluir,
    cadastrar,
    listar,
    atualizar,
    consultar
};
