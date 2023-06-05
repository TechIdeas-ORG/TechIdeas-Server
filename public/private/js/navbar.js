var isCollapsed = false;
const navbar = document.getElementById('navbar');
const collapseText = document.getElementById('collapse_text');
const nmUser = document.getElementById('navbar_nmUser');
const containers = document.getElementsByClassName('container');

nmUser.innerText = sessionStorage.NOME_USUARIO;

function collapse(collapse_button){
    if(isCollapsed){
        navbar.style.left = '0px';
        collapseText.style.transform = 'rotate(0deg)';
        isCollapsed = false;
        for(let i = 0; i < containers.length; i++){
            var container = containers[i];

            container.style = 'padding-left: 280px !important'
        }
    }else{
        navbar.style.left = '-260px';
        collapseText.style.transform = 'rotate(180deg)';
        isCollapsed = true;
        for(let i = 0; i < containers.length; i++){
            var container = containers[i];
            container.style = 'padding-left: 80px !important'
            console.log(container)
        }
    }
}

//VERIFICAR SESSION 
if(sessionStorage.ID_USUARIO == undefined){
    window.location = '../login.html';
}