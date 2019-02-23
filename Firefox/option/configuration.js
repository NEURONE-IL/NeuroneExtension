console.log("empezo configuration.js");

window.detectBrowser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

var stateSnipper;
var stateBookmark;
var stateAction;
var stateKey;
var stateMouse;
var stateQuery;
var statePage;

document.addEventListener('DOMContentLoaded', LoadFavorites);

function LoadFavorites(){
    
    document.getElementById("saveServer").addEventListener("click", ConectToServer);
    document.getElementById("saveUser").addEventListener("click", saveUser);
    document.getElementById("saveTime").addEventListener("click", saveNewTime);

    var bg = detectBrowser.extension.getBackgroundPage();

    stateSnipper = bg.snipperOn;
    stateBookmark = bg.bookmarkOn;
    stateAction = bg.actionOn;
    stateKey = bg.keyloggerOn;
    stateMouse = bg.mouseOn;
    stateQuery = bg.queryOn;
    statePage = bg.pageOn;

    var botonSniper = document.getElementById("Onsnipper");
    if(stateSnipper){   botonSniper.innerHTML = "Turn Off";
    }else{  botonSniper.innerHTML = "Turn On";
    }

    var botonBookmark = document.getElementById("Onbookmark");
    if(stateBookmark){
        botonBookmark.innerHTML = "Turn Off";
    }else{
        botonBookmark.innerHTML = "Turn On";
    }

    var botonAction = document.getElementById("Onaction");
    if(stateAction){
        botonAction.innerHTML = "Turn Off";
    }else{
        botonAction.innerHTML = "Turn On";
    }

    var botonKey = document.getElementById("Onkey");
    if(stateKey){
        botonKey.innerHTML = "Turn Off";
    }else{
        botonKey.innerHTML = "Turn On";
    }

    var botonMouse = document.getElementById("Onmouse");
    if(stateMouse){
        botonMouse.innerHTML = "Turn Off";
    }else{
        botonMouse.innerHTML = "Turn On";
    }
    
    var botonPage = document.getElementById("Onpage");
    if(statePage){
        botonPage.innerHTML = "Turn Off";
    }else{
        botonPage.innerHTML = "Turn On";
    }

    var botonQuery = document.getElementById("Onquery");
    if(stateQuery){
        botonQuery.innerHTML = "Turn Off";
    }else{
        botonQuery.innerHTML = "Turn On";
    }

    botonSniper.addEventListener("click", function(e){ OnOff(e); }, false);
    botonBookmark.addEventListener("click", function(a){ OnOff(a); }, false);
    botonAction.addEventListener("click", function(e){ OnOff(e); }, false);
    botonKey.addEventListener("click", function(e){ OnOff(e); }, false);
    botonMouse.addEventListener("click", function(e){ OnOff(e); }, false);
    botonPage.addEventListener("click", function(e){ OnOff(e); }, false);
    botonQuery.addEventListener("click", function(e){ OnOff(e); }, false);
}

//save new Url Server
function ConectToServer(){

    var server = document.getElementById("server");
    var port = document.getElementById("port");

    let mensaje = {
        txt : "conectServer",
        server : server.value,
        port: port.value
    }

    detectBrowser.runtime.sendMessage(mensaje,   function (response) {
        //console.log(response);
    });
}

//save new user
function saveUser(){
    
    var user = document.getElementById("user");
    
    let mensaje = {
        txt : "newUser",
        userId : user.value
    }
    
    detectBrowser.runtime.sendMessage(mensaje,   function (response) {
        //console.log(response);
    });
}

function OnOff(arg){

    var idBoton = arg.target.id;
    var atribute = idBoton.split("On").pop();

    var boton = document.getElementById(idBoton);

    switch(idBoton) {
        case "Onsnipper":
            // code block
            if(stateSnipper){
                stateSnipper=false;
                boton.innerHTML = "Turn on";
            }else{
                stateSnipper=true;
                boton.innerHTML = "Turn off";
            }
            break;
        case "Onbookmark":
            // code block
            if(stateBookmark){
                stateBookmark=false;
                boton.innerHTML = "Turn on";
            }else{
                stateBookmark=true;
                boton.innerHTML = "Turn off";
            }
            break;
        case "Onaction":
            // code block
            if(stateAction){
                stateAction=false;
                boton.innerHTML = "Turn on";
            }else{
                stateAction=true;
                boton.innerHTML = "Turn off";
            }
            break;
        case "Onkey":
            // code block
            if(stateKey){
                stateKey=false;
                boton.innerHTML = "Turn on";
            }else{
                stateKey=true;
                boton.innerHTML = "Turn off";
            }
            break;
        case "Onmouse":
            // code block
            if(stateMouse){
                stateMouse=false;
                boton.innerHTML = "Turn on";
            }else{
                stateMouse=true;
                boton.innerHTML = "Turn off";
            }
            break;
        case "Onpage":
            // code block
            if(statePage){
                statePage=false;
                boton.innerHTML = "Turn on";
            }else{
                statePage=true;
                boton.innerHTML = "Turn off";
            }
            break;
        case "Onquery":
            // code block
            if(stateQuery){
                stateQuery=false;
                boton.innerHTML = "Turn on";
            }else{
                stateQuery=true;
                boton.innerHTML = "Turn off";
            }
            break;
        default:
          // code block
    }

    let mensaje = {
        txt : "ChangeState",
        on : atribute        
    }
    
    detectBrowser.runtime.sendMessage(mensaje,   function (response) {
        //console.log(response);
    });

}

//save new lapse of time for capture of mouse events
function saveNewTime(){
    
    var newTime = document.getElementById("time");
    
    let mensaje = {
        txt : "newTime",
        newTimeCapture : newTime.value
    }
    
    detectBrowser.runtime.sendMessage(mensaje);
}