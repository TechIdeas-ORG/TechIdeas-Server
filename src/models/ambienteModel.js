var database = require("../database/connection")

function listar1(idAmbiente) {
    console.log("ACESSEI O AMBIENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar() \n\n " + idAmbiente);
    var instrucao = `
    select SUM(valMetrica) as soma, HOUR(dateMetrica) as horario
    from tbMetricas
    join tbSensor on fkSensor = idSensor
    join tbAmbiente on fkAmbiente = idAmbiente
	where idAmbiente = 1 and DATEDIFF(dateMetrica, now()) = "00:30:00" 
    GROUP BY HOUR(dateMetrica)
	order by HOUR(dateMetrica) DESC;

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
    select SUM(valMetrica) as soma, minute(dateMetrica) as horario, idAmbiente
    from tbMetricas
    join tbSensor on fkSensor = idSensor
    join tbAmbiente on fkAmbiente = idAmbiente
    join tbEmpresa on tbAmbiente.fkEmpresa = idEmpresa
    JOIN tbUsuario ON idEmpresa = tbUsuario.fkEmpresa
    where DATEDIFF(dateMetrica, now()) = "00:30:00" and idUsuario = ${idUsuario}
    GROUP BY minute(dateMetrica)
    order by minute(dateMetrica);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = { 
    listar1,
    buscarAmbientes,
    buscarTodos
};