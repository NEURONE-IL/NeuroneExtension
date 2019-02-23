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


window.user = "EdgeUser";
window.urlServer = "http://192.168.0.16:3000/";

window.listURLs = new Array();
window.listBookmarks = new Array();
window.listSnippers = new Array();

window.timeCapture = 30000; // 30 seconds

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/


detectBrowser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
       if (request.txt == "getSnippers"){
           let list = JSON.stringify(listSnippers);
           //console.log(list);
           sendResponse({result: list});
       }
       if(request.txt == "getTimeCapture"){
            sendResponse({result: timeCapture});
       }

   });