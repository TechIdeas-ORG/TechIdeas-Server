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
    /*
    var arrayPrimeiroDia = primeiro_dia.split('-');
    var diaPrimeiro = arrayPrimeiroDia[0];
    var mesPrimeiro = arrayPrimeiroDia[1];
    var anoPrimeiro = arrayPrimeiroDia[2];
    */

    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar() \n\n ");
    var instrucao = `
    select SUM(valMetrica) as soma, DAY(dateMetrica) as horario
    from tbMetricas
    join tbSensor on fkSensor = idSensor
    join tbAmbiente on fkAmbiente = idAmbiente
    where idAmbiente = ${idAmbiente} AND DAY(dateMetrica) BETWEEN '${primeiro_dia}' AND '${ultimo_dia}'
    GROUP BY DAY(dateMetrica)
    order by DAY(dateMetrica) asc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = { 
    listar1,
    buscarAmbientes,
    buscarTodos,
    buscarDia,
    listarDireita
};