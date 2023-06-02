var alertas = [];

function obterdados(idAmbiente) {
    var fkUser = sessionStorage.ID_USUARIO;
    if (fkUser != null) {
        fetch(`/ambiente/consultaTodos/${fkUser}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (novoRegistro) {
                    alertar(novoRegistro, null)
                        
                })
            }
        })
    }

}

function alertar(resposta, idAmbiente) {
    for (let i = 0; i < resposta.length; i++) {
        var temp = resposta[i].soma;
        var grauDeAviso = '';
        var classe_temperatura = 'cor-alerta';

        if (temp >= resposta[i].maximoPessoas) {
            classe_temperatura = 'cor-alerta perigo-quente';
            grauDeAviso = 'PERIGO,fluxo acima da capacidade máxima'
            grauDeAvisoCor = 'cor-alerta perigo-quente'
            exibirAlerta(temp, resposta[i].idAmbiente, grauDeAviso, grauDeAvisoCor, resposta[i].nomeAmbiente)
        }
        else if (temp <= resposta[i].minimoPessoas) {
            classe_temperatura = 'cor-alerta perigo-frio';
            grauDeAviso = 'Reduzido, baixo fluxo de pessoas'
            grauDeAvisoCor = 'cor-alerta perigo-frio'
            exibirAlerta(temp, resposta[i].idAmbiente, grauDeAviso, grauDeAvisoCor,  resposta[i].nomeAmbient)
        }
        else {
            classe_temperatura = 'cor-alerta ideal';
            removerAlerta(resposta[i].idAmbiente);
        }
        
        
    }


}

function exibirAlerta(temp, idAmbiente, grauDeAviso, grauDeAvisoCor,nomeAmbiente) {
    var indice = alertas.findIndex(item => item.idAmbiente == idAmbiente);
    alert(nomeAmbiente)
    if (indice >= 0) {
        alertas[indice] = { idAmbiente, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idAmbiente, temp, grauDeAviso, grauDeAvisoCor,nomeAmbiente });
    
    }
    exibirCards();

    // Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
    // que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idAmbiente) {
    alertas = alertas.filter(item => item.idAmbiente != idAmbiente);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.style = 'display:block'
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idAmbiente, temp, grauDeAviso, grauDeAvisoCor,nomeAmbiente }) {
    return `<div class="mensagem-alarme ${grauDeAviso}">
    <div class="informacao">
    <div class="bola_aviso">&#12644;</div> 
     <h3>${nomeAmbiente} está em estado de ${grauDeAviso}!</h3>
    <small>Fluxo: ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
    
}