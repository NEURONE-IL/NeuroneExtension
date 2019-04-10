console.log("bQuery.js esta corriendo");

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

detectBrowser.runtime.onMessage.addListener(newQuery);

/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/

function newQuery(mensaje,sender,sendResponse){

    if(queryOn){
    
        if(mensaje.txt === "nuevapestaña"){
            let timestamp = new Date();
            timestamp.getDate();

            var url =  sender.tab.url;
            var title = sender.tab.title;

            var split = url.split('q=')[1];
            if(split!=null){
                split = split.split('&')[0];
                var replaced = split.split('+').join(' ');

                //save query
                var requestQuery = new XMLHttpRequest();
                requestQuery.open("POST", urlServer+"query", true);
                requestQuery.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                requestQuery.send(JSON.stringify({
                    "userName": user,
                    "query": replaced,
                    "url" : url,
                    "title" : title,
                    "time": timestamp
                }));
            }

        }
    
    }

}
