console.log("newPage.js extension go");


window.detectBrowser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

function newPage(){
    let mensaje={
        txt : "nuevapestaña"
        
    }

    browser.runtime.sendMessage(mensaje);
}

newPage();

