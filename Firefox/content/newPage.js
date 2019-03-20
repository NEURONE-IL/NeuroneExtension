console.log("newPage.js extension go");


function newPage(){
    let mensaje={
        txt : "nuevapestaña"
        
    }

    browser.runtime.sendMessage(mensaje);
}

newPage();

