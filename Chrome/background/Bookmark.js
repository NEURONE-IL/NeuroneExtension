console.log("bBookmark.js esta corriendo");

var bookmark = {
    "id": "bookmark",
    "title": "Add new Bookmark" ,
    "contexts": ["page"],
    "onclick" : saveBookmar
};



/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/

function DeleteBookmark(mensaje,sender,sendResponse){

    if(mensaje.txt === "DeleteBookmark"){
        let timestamp = new Date();
        timestamp.getDate();

        for(lb of listBookmarks){
            if(listBookmarks.indexOf(lb) == mensaje.idBookmark){
                //send to server
                console.log(mensaje.idBookmark);

                var requestBookmark = new XMLHttpRequest();
                requestBookmark.open("POST", urlServer+"bookmark", true);
                requestBookmark.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                requestBookmark.send(JSON.stringify({
                    "userName": user,
                    "type" : "unbookmark",
                    "url": lb.urlpage,
                    "title" : lb.title,
                    "time": timestamp
                }));

        
            }
        }

        listBookmarks.splice( mensaje.idBookmark, 1);
    }

}



function saveBookmar(page){  
    if(bookmarkOn){
        
        if(page.pageUrl != null){
            let timestamp = new Date();
            timestamp.getDate();
            
            let existBookmark = false;
            for(s of listBookmarks){
                if(s.urlpage ==page.pageUrl){
                    existBookmark = true;
                }
            }

            var getTitle;
            for(urls of listURLs){
                if(urls.urlPage === page.pageUrl){
                    getTitle = urls.titlePage;
                }
            }

            if(existBookmark==false){
                var newBookmark ={
                    urlpage: page.pageUrl,
                    title: getTitle,
                    time: timestamp
                };       
                listBookmarks.push(newBookmark);
                alert("save ");
           
                //send to server
                var requestBookmark = new XMLHttpRequest();
                requestBookmark.open("POST", urlServer+"bookmark", true);
                requestBookmark.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                requestBookmark.send(JSON.stringify({
                    "userName": user,
                    "type" : "bookmark",
                    "url": newBookmark.urlpage,
                    "title" : newBookmark.title,
                    "time": newBookmark.time
                }));

            }
        }
    //fin IF OnOff
    }

}


/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

detectBrowser.runtime.onMessage.addListener(DeleteBookmark);

detectBrowser.contextMenus.create(bookmark);