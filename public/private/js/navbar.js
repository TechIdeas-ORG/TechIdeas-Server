var isCollapsed = false;
const navbar = document.getElementById('navbar');
const collapseText = document.getElementById('collapse_text');

function collapse(collapse_button){
    if(isCollapsed){
        navbar.style.left = '0px';
        collapseText.style.transform = 'rotate(0deg)';
        isCollapsed = false;
    }else{
        navbar.style.left = '-260px';
        collapseText.style.transform = 'rotate(180deg)';
        isCollapsed = true;
    }
}

//VERIFICAR SESSION
if(sessionStorage.ID_USUARIO == undefined){
    window.location = '../login.html';
}