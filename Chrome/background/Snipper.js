console.log("bSnipper.js esta corriendo");

/*////////////////////////////////////////////////////////////////
                        Var
////////////////////////////////////////////////////////////////*/

let textSnipper = {
    text :"",
    textHtml: "",
    urlPage: "",
    title: "",
};

var snipper = {
    "id": "snipper",
    "title": "save selected text",
    "contexts": ["selection"],
    "onclick" : saveSnipper
};

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

detectBrowser.runtime.onMessage.addListener(InputMesagge);

detectBrowser.contextMenus.create(snipper);

/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/


function InputMesagge(mensaje,sender,sendResponse){
    
    //fragment of text capture in snipper.js 
    if(mensaje.txt === "textMouseup"){
        textSnipper.text = mensaje.text;
        textSnipper.textHtml = mensaje.textHtml;
        textSnipper.urlPage = sender.tab.url;
        textSnipper.title = sender.tab.title;
        //console.log("actual text " +text);
    }

    //Delete snipper
    if(mensaje.txt === "DeleteSnipper"){
        let timestamp = new Date();
        timestamp.getDate();

        for(ls of listSnippers){
            if(listSnippers.indexOf(ls) == mensaje.idSnipper){
                //send to server
                var requestSnippers = new XMLHttpRequest();
                requestSnippers.open("POST", urlServer+"snipper", true);
                requestSnippers.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                requestSnippers.send(JSON.stringify({
                    "userName": user,
                    "type": "unsnipper",
                    "text": ls.text,
                    "url": ls.urlPage,
                    "title": ls.title,
                    "time": timestamp
                }));
            }
        }

        listSnippers.splice( mensaje.idSnipper, 1);
    }
    
}

//save new Snipper
function saveSnipper(){
    if(snipperOn){
        if(textSnipper.text != ""){
            let timestamp = new Date();
            timestamp.getDate();
            var newSnipper = {
                text: textSnipper.text,
                textHtml: textSnipper.textHtml,
                urlPage: textSnipper.urlPage,
                title: textSnipper.title,
                time: timestamp
            };
            textSnipper.texto = "";
            textSnipper.urlPage = "";
    
            listSnippers.push(newSnipper);
            alert("save snipper");
    
            //send to server
            var requestSnippers = new XMLHttpRequest();
            requestSnippers.open("POST", urlServer+"snipper", true);
            requestSnippers.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            requestSnippers.send(JSON.stringify({
                "userName": user,
                "type": "snipper",
                "text": newSnipper.text,
                "url": newSnipper.urlPage,
                "title": newSnipper.title,
                "time": newSnipper.time
            }));
            
            detectBrowser.tabs.query({}, function(tabs) {
                var mensaje = {
                    txt : "listSnippers",
                    text: listSnippers
                };
                for (var i=0; i<tabs.length; ++i) {
                    detectBrowser.tabs.sendMessage(tabs[i].id, mensaje);
                }
            });
        }
    }
    
}


