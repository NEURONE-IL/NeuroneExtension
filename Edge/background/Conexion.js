console.log("bConexion.js esta corriendo");

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/


detectBrowser.runtime.onMessage.addListener(newConfiguration);


/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/

function newConfiguration(mensaje,sender,sendResponse){
    
    if(mensaje.txt === "conectServer"){
        urlServer = mensaje.server+":"+mensaje.port;

        Conexion = true;
    }

    if(mensaje.txt === "newUser"){
        user = mensaje.userId;   
        console.log(user);
    }

    if(mensaje.txt === "ChangeState"){
        if(mensaje.on === "snipper"){
            snipperOn = !snipperOn;
        }
        if(mensaje.on === "bookmark"){
            bookmarkOn = !bookmarkOn;
        }
        if(mensaje.on === "action"){
            actionOn = !actionOn;
        }
        if(mensaje.on === "key"){
            keyloggerOn = !keyloggerOn;
        }
        if(mensaje.on === "mouse"){
            mouseOn = !mouseOn;
        }
        if(mensaje.on === "page"){
            pageOn = !pageOn;
        }
        if(mensaje.on === "query"){
            queryOn = !queryOn;
        }
    }

    if(mensaje.txt === "newTime"){
        timeCapture = mensaje.newTimeCapture;   
    }
    
}