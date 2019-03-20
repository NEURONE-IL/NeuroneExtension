console.log("newPage.js extension go");


function newPage(){
    let mensaje={
        txt : "nuevapestaña"
        
    }

    chrome.runtime.sendMessage(mensaje);
}

newPage();

