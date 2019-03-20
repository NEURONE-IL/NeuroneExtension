console.log("Global.js esta corriendo");

/*////////////////////////////////////////////////////////////////
   variables globales que corren el el background de la extension
////////////////////////////////////////////////////////////////*/

window.detectBrowser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

window.Conexion = true;

window.snipperOn = false;
window.bookmarkOn = false;
window.actionOn = false;
window.queryOn = false;
window.keyloggerOn = false;
window.mouseOn = false;
window.pageOn = false;


window.user = "userChrome";
window.urlServer = "http://localhost:3000";

window.listURLs = new Array();
window.listBookmarks = new Array();
window.listSnippers = new Array();

window.timeCapture = 3000; // 3 seconds

/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/


detectBrowser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
       
       if (request.txt == "getSnippers"){
            sendResponse({result: listSnippers});
       }
       if(request.txt == "getTimeCapture"){
            sendResponse({result: timeCapture});
       }
           
   });