emailModel = require("../models/emailModel");


function enviar(req, res){
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var mensagem = req.body.mensagemServer;

    if(mensagem == undefined){
        res.status(400).send("Mensagem não chegou");
    } else if(telefone == undefined){
        res.status(400).send("Telefone não chegou");
    } else if(email == undefined){
        res.status(400).send("E-mail não chegou");
    } else if(nome == undefined){
        res.status(400).send("Nome não chegou");
    } else{
        emailModel.enviar(nome, email, telefone, mensagem).then((resposta) => {
            if(resposta.length > 0){
                console.log("E-mail enviado")
                res.status(200).json(resposta);
            }
            else{
                res.status(204).send("Algum erro ocorreu ou nenhuma linha retornada")
            }

        }).catch((erro) => {
            console.log(erro);
            res.status(500).send(erro);
        })
    }
    
}






module.exports = {
    enviar
}