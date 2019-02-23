console.log("webpage.js esta corriendo");

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

detectBrowser.runtime.onMessage.addListener(NewWebPage);

detectBrowser.tabs.onUpdated.addListener(ChangePage);

detectBrowser.tabs.onRemoved.addListener(ClosePage);


/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/

function NewWebPage(mensaje,sender,sendResponse){

        //new webPage
        if(mensaje.txt === "nuevapestaña"){
            let timestamp = new Date();
            timestamp.getDate();
    
            var nuevaUrl = {
                urlPage: sender.tab.url,
                titlePage: sender.tab.title,
                timeZero: timestamp,
                timeFinal: "",
                timeInAPage: "",
                finish : 0,
                idTabPage : sender.tab.id
                
            }
            listURLs.push(nuevaUrl);
           
        }
    
}

//seguir acciones usuario.
function ChangePage(tabId, statusTab, oldtab){
    
    if(pageOn){
        
        if(statusTab.status === "complete" & statusTab.status !== null){

            console.log("hola baby")
            var timestamp = new Date();
            timestamp.getDate();
            
            for(page of listURLs){
                if(page.idTabPage === oldtab.id && page.finish === 1){
                    page.timeFinal = timestamp;
                    page.timeInAPage = page.timeFinal-page.timeZero;//milisegundos
                    page.finish++;
                    //save web page
                    var requestWeb = new XMLHttpRequest();
                    requestWeb.open("POST", urlServer+"/webpage", true);
                    requestWeb.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    requestWeb.send(JSON.stringify({
                        "userName": user,
                        "idTab": page.idTabPage,
                        "url": page.urlPage,
                        "title": page.titlePage,
                        "timeZero": page.timeZero,
                        "timeFinal": page.timeFinal,
                        "timeInThePage": page.timeInAPage
                    }));

                    
                }
                if(page.idTabPage === oldtab.id && page.finish === 0){
                    page.finish++;
                    
                }
            }
    
            
        }
    }
    
}


function ClosePage(tabId, info){

    if(pageOn){
        var timestamp = new Date();
        timestamp.getDate();
        var url=""; 
        var title="";

        for(page of listURLs){
            if(page.idTabPage === tabId && page.finish < 2){
                page.timeFinal = timestamp;
                page.timeInAPage = page.timeFinal-page.timeZero;//milisegundos
                page.finish++;
                url= page.urlPage;
                title= page.titlePage;

                //save web page
                var requestWeb = new XMLHttpRequest();
                requestWeb.open("POST", urlServer+"/webpage", true);
                requestWeb.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                requestWeb.send(JSON.stringify({
                    "userName": user,
                    "idTab": page.idTabPage,
                    "url": page.urlPage,
                    "title": page.titlePage,
                    "timeZero": page.timeZero,
                    "timeFinal": page.timeFinal,
                    "timeInThePage": page.timeInAPage
                }));

            }
        }

    }

}




