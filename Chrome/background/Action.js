console.log("bAction.js esta corriendo");

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

detectBrowser.tabs.onCreated.addListener(CreateNewTab);

detectBrowser.tabs.onUpdated.addListener(ChangeTab);

detectBrowser.tabs.onRemoved.addListener(CloseTab);

/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/

function CreateNewTab(tab){

    if(actionOn){

        var timestamp = new Date();
        timestamp.getDate();
        //save action
        var requestAction = new XMLHttpRequest();
	    requestAction.open("POST", urlServer+"action", true);
        requestAction.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        requestAction.send(JSON.stringify({
           	"userName": user,
           	"action": "CreateTab",
            "idtab": tab.id,
            "url": tab.url,
            "title": tab.title,
            "time": timestamp
        }));
    
    }

}
           
//save Change Page in the tab
function ChangeTab(tabId, StatusTab, tab){
    
    if(actionOn){
        
        if(StatusTab.status === "complete" & StatusTab.status !== null){

            var timestamp = new Date();
            timestamp.getDate();

            //save Change Page in the tab
            var requestAction = new XMLHttpRequest();
            requestAction.open("POST", urlServer+"action", true);
            requestAction.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            requestAction.send(JSON.stringify({
                "userName": user,
                "action": "ChangeTab",
                "idtab": tab.id,
                "url": tab.url,
                "title": tab.title,
                "time": timestamp
            }));

        }

    }

}

function CloseTab(tabId, info){

    if(actionOn){

        var timestamp = new Date();
        timestamp.getDate();

        var url=""; 
        var title="";

        //save action
        var requestAction = new XMLHttpRequest();
	    requestAction.open("POST", urlServer+"action", true);
        requestAction.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        requestAction.send(JSON.stringify({
           	"userName": user,
           	"action": "CloseTab",
            "idtab": tabId,
            "url": url,
            "title": title,
            "time": timestamp
        }));
    }

}