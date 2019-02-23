console.log("bMouseTracker.js esta corriendo");

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

detectBrowser.runtime.onMessage.addListener(inputMouse);

/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/


//recive mouse data from mouseTracker.js
function inputMouse(mensaje,sender,sendResponse){
 
    if(mouseOn){

        if(mensaje.txt === "mousePosition"){
            let timestamp = new Date();
            timestamp.getDate();
            //save mouse coordenates
            var requestMouse = new XMLHttpRequest();
            requestMouse.open("POST", urlServer+"/mouseposition", true);
            requestMouse.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            requestMouse.send(JSON.stringify({
                "userName": user,
                "url": sender.tab.url,
                "title" : sender.tab.title,
                "x_win": mensaje.x_win,
                "y_win": mensaje.y_win,
                "w_win": mensaje.w_win,
                "h_win": mensaje.h_win,
                "x_doc": mensaje.x_doc,
                "y_doc": mensaje.y_doc,
                "w_doc": mensaje.w_doc,
                "h_doc": mensaje.h_doc,
                "time": timestamp
            }));
        }

        if(mensaje.txt === "mouseclick"){
            let timestamp = new Date();
            timestamp.getDate();
    
            //Save Mouse clicks
            var requestClicks = new XMLHttpRequest();
            requestClicks.open("POST", urlServer+"/mouseclick", true);
            requestClicks.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            requestClicks.send(JSON.stringify({
                "userName": user,
                   "url": sender.tab.url,
                   "title" : sender.tab.title,
                   "x_win": mensaje.x_win,
                   "y_win": mensaje.y_win,
                   "w_win": mensaje.w_win,
                   "h_win": mensaje.h_win,
                   "x_doc": mensaje.x_doc,
                   "y_doc": mensaje.y_doc,
                   "w_doc": mensaje.w_doc,
                   "h_doc": mensaje.h_doc,
                   "time": timestamp
            }));
        }

    }

}