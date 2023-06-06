var AmbienteModel = require("../models/ambienteModel");
const {jsPDF} = require("jspdf");


function genDoc(resultado){
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(20, 20, `Relatório Mensal do ${resultado[0].nomeAmbiente}`);

    var temp_dia = '';
    var linha = 20;
    
    resultado.forEach(dado => {
        linha += 10;
        if(dado.dia != temp_dia){
            doc.setFontSize(18);
            doc.text(20, linha+10,'Dia: ' + dado.dia);
            temp_dia = dado.dia;
            linha += 20;
        }
        console.log(linha)
        if(linha >= 250){
            doc.addPage()
            linha = 20;
        }

        doc.setFontSize(12);
        doc.text(20, linha, `Hora: ${dado.hora}:  Fluxo: ${dado.soma}`);
    });
    return doc;
}

function relatorio(req, res){
    var idAmb = req.params.idAmbiente;
    var idUser = req.params.idUsuario;
    
    AmbienteModel.relatorio(idAmb, idUser)
        .then(function (resultado) {
            if (resultado.length > 0) {
                var pdf = genDoc(resultado);
                res.status(200).json({pdf: pdf.output()});
            }else{
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function listar(req, res) {
    var idAmb = req.params.idAmbiente;
    AmbienteModel.listar1(idAmb)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultaAmbiente(req, res) {
    var idUsuario = req.params.idUsuario;
    AmbienteModel.buscarAmbientes(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function listarDireita(req, res) {
    var idUsuario = req.params.idUsuario;
    AmbienteModel.listarDireita(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function consultaTodos(req, res) {
    var idUsuario = req.params.fkUser;

    console.log("cheguei no consula todos controller " +idUsuario)
    AmbienteModel.buscarTodos(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function consultaDia(req, res) {
    var primeiro_dia = req.params.primeiro_dia;
    var ultimo_dia = req.params.ultimo_dia;
    var idAmbiente = req.params.idAmbiente;
    AmbienteModel.buscarDia(idAmbiente, primeiro_dia, ultimo_dia)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function testar(req, res) {
    console.log("ENTRAMOS NA ambienteController");
    res.json("ESTAMOS FUNCIONANDO!");
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkEmpresa = req.body.fkEmpresaServer;
    var ambiente = req.body.ambiente;
    var descAmbiente = req.body.descAmbiente;
    var setorAmbiente = req.body.setorAmbiente;
    var minimoPessoas = req.body.minimoPessoas;
    var mediaPessoas = req.body.mediaPessoas;
    var maximoPessoas = req.body.maximoPessoas;

    // Faça as validações dos valores
    if (ambiente == undefined) {
        res.status(400).send("O nome do ambiente está undefined!");
    } else if (descAmbiente == undefined) {
        res.status(400).send("A descrição do ambiente está undefined!");
    } else if (setorAmbiente == undefined) {
        res.status(400).send("O setor do ambiente está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo AmbienteModel.js
        AmbienteModel.cadastrar(fkEmpresa, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluir(req, res) {
    var idAmbiente = req.body.identificadorAmbiente;
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var identificadorAmbiente: identificador;

    // Faça as validações dos valores
    if (idAmbiente == undefined) {
        res.status(400).send("O id do ambiente está undefined!");
    } else {
        // Passando o id como parâmetro para ir ao arquivo AmbienteModel.js
        AmbienteModel.excluir(idAmbiente)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao excluir o ambiente! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idAmbiente = req.body.idAmbiente;
    var ambiente = req.body.ambiente;
    var descAmbiente = req.body.descAmbiente;
    var setorAmbiente = req.body.setorAmbiente;
    var minimoPessoas = req.body.minimoPessoas;
    var mediaPessoas = req.body.mediaPessoas;
    var maximoPessoas = req.body.maximoPessoas;

    // Faça as validações dos valores
    if (idAmbiente == undefined){
        res.status(400).send("O id do ambiente está undefined!");
    } else if (ambiente == undefined) {
        res.status(400).send("O nome do ambiente está undefined!");
    } else if (descAmbiente == undefined) {
        res.status(400).send("A descrição do ambiente está undefined!");
    } else if (setorAmbiente == undefined) {
        res.status(400).send("O setor do ambiente está undefined!");
    } else if (minimoPessoas == undefined) {
        res.status(400).send("O minimo de pessoas para esse ambiente está undefined!");
    } else if (mediaPessoas == undefined) {
        res.status(400).send("A média de pessoas para esse ambiente está undefined!");
    } else if(maximoPessoas == undefined){
        res.status(400).send("O máximo de pessoas para esse ambiente está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo AmbienteModel.js
        AmbienteModel.atualizar(idAmbiente, ambiente, descAmbiente, setorAmbiente, minimoPessoas, mediaPessoas, maximoPessoas)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar o ambiente! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function consultar(req, res) {
    var idUsuario = req.params.idAmbiente;
    

    AmbienteModel.consultar(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function media_fluxo(req, res){
    var idUsuario = req.params.idUsuario;
    console.log('cheguei no media fluxo ' + idUsuario)
    AmbienteModel.media_fluxo(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }   
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function maior_fluxo(req, res){
    var idUsuario = req.params.idUsuario;
    console.log('cheguei no maior fluxo ' + idUsuario)
    AmbienteModel.maior_fluxo(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function aumento_fluxo(req, res){
    var idUsuario = req.params.idUsuario;
    console.log('cheguei no aumento fluxo ' + idUsuario)
    AmbienteModel.aumento_fluxo(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log(resultado)
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    consultaAmbiente,
    consultaTodos,
    consultaDia,
    listarDireita,
    cadastrar,
    testar,
    excluir,
    atualizar,
    consultar,
    media_fluxo,
    maior_fluxo,
    aumento_fluxo,
    relatorio
}