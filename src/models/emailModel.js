var nodemailer = require('nodemailer');


function enviar(nome, email, telefone, mensagem){


    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'techideas.org@gmail.com',
        pass: 'btmgbasfboqfpcys'
    }
    });

    var mailOptions = {
    from: 'techideas.org@gmail.com',
    to: 'techideas.org@gmail.com',
    subject: 'Pedido de cadastro',
    text: `'Olá gostário de me cadastrar: <BR> meu email:${email} <br> meu nome: ${nome} <br> meu telefone: ${mensagem} <br> minha mensagem: ${mensagem} <br> meu telefone: ${telefone}`
    };

    return new Promise ((resolve, reject) => { transporter.sendMail(mailOptions, function(error, info){
        if(error){
            reject(error)
        }
        else{
            resolve("Email enviado: " + info.response)
        }
    })
    })
}

module.exports = {enviar}