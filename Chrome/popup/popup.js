console.log("empezo popup.js");

window.detectBrowser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome;
})();

document.addEventListener('DOMContentLoaded', LoadFavorites);

var favoriteBookmarks;
var favoriteSnippers;
var stateSnipper;
var stateBookmark

function LoadFavorites(){
    
    var bg = detectBrowser.extension.getBackgroundPage();
    favoriteBookmarks = bg.listBookmarks;
    favoriteSnippers = bg.listSnippers;

    stateSnipper = bg.snipperOn;
    stateBookmark = bg.bookmarkOn;

    //update HTML
    var titleBook = document.getElementById("divBookmarks");
    var newList =  document.createElement("ul");
    newList.setAttribute('id','Bookmarks');
    newList.setAttribute('class','list-group');

    titleBook.appendChild(newList);

    for(b of favoriteBookmarks){
        var li = document.createElement("li");
        li.setAttribute('class','list-group-item d-flex');
  
        var div_c0 =document.createElement("div");
        div_c0.setAttribute('class','col-sm-8');
        var div_c1 =document.createElement("div");
        div_c1.setAttribute('class','col-sm-2');
        var div_c2 =document.createElement("div");
        div_c2.setAttribute('class','col-sm-1');


        var name_b = document.createElement("p");
        name_b.setAttribute('id','url'+favoriteBookmarks.indexOf(b)+'');
        name_b.innerText = b.urlpage;

        var button_b = document.createElement("button");
        button_b.setAttribute('type','button');
        button_b.setAttribute('id','delete'+favoriteBookmarks.indexOf(b)+'');
        button_b.setAttribute('class','btn btn-primary');
        button_b.setAttribute('value', favoriteBookmarks.indexOf(b) );
        button_b.innerText = "delete";
        
        var button_o = document.createElement("button");
        button_o.setAttribute('type','button');
        button_o.setAttribute('id','open'+favoriteBookmarks.indexOf(b)+'');
        button_o.setAttribute('class','btn btn-primary');
        button_o.setAttribute('value', b.urlpage);
        button_o.innerText = "open";

        newList.appendChild(li);
        li.appendChild(div_c0);
        div_c0.appendChild(name_b);
        li.appendChild(div_c1);
        div_c1.appendChild(button_b);
        li.appendChild(div_c2);
        div_c2.appendChild(button_o);

    }

    var titleSnipper = document.getElementById("divSnippers");
    var ul =  document.createElement("ul");
    ul.setAttribute('id','Snippers');
    ul.setAttribute('class','list-group');
    titleSnipper.appendChild(ul);

    for(s of favoriteSnippers){
        var li = document.createElement("li");
        li.setAttribute('class','list-group-item d-flex');

        var div_c3 =document.createElement("div");
        div_c3.setAttribute('class','col-sm-8');
        var div_c4 =document.createElement("div");
        div_c4.setAttribute('class','col-sm-2');
        var div_open =document.createElement("div");
        div_open.setAttribute('class','col-sm-1');

        var name_s = document.createElement("p");
        name_s.setAttribute('id','snipper'+favoriteSnippers.indexOf(s)+'');
        name_s.innerText = s.text;

        var button_s = document.createElement("button")
        button_s.setAttribute('type','button');
        button_s.setAttribute('id','deletes'+favoriteSnippers.indexOf(s)+'');
        button_s.setAttribute('class','btn btn-primary');
        button_s.innerText = "delete";

        var button_os = document.createElement("button")
        button_os.setAttribute('type','button');
        button_os.setAttribute('id','openSnipper'+favoriteSnippers.indexOf(s)+'');
        button_os.setAttribute('class','btn btn-primary');
        button_os.setAttribute('value', s.urlPage);
        button_os.innerText = "open";

        ul.appendChild(li);
        li.appendChild(div_c3);
        div_c3.appendChild(name_s);
        li.appendChild(div_c4);
        div_c4.appendChild(button_s);
        li.appendChild(div_open);
        div_open.appendChild(button_os);

    }

    //select bookmark for delete
    for(fb of favoriteBookmarks){
        //console.log(favoriteBookmarks.indexOf(fb))
        document.getElementById("delete"+favoriteBookmarks.indexOf(fb)).addEventListener("click", function(e){
            DeleteBookmark(e);
        }, false);
    }

    //open bookmark
    for(ob of favoriteBookmarks){
        //console.log(favoriteBookmarks.indexOf(fb))
        document.getElementById("open"+favoriteBookmarks.indexOf(ob)).addEventListener("click", function(e){
            openSnippet(e);
        }, false);
    }

    //select Snippers for delete
    for(s of favoriteSnippers){
        //console.log(favoriteBookmarks.indexOf(fb))
        document.getElementById("deletes"+favoriteSnippers.indexOf(s)).addEventListener("click", function(e){
            DeleteSnipper(e);
        }, false);
    }

    //select Snippers for delete
    for(s of favoriteSnippers){
        //console.log(favoriteBookmarks.indexOf(fb))
        document.getElementById("openSnipper"+favoriteSnippers.indexOf(s)).addEventListener("click", function(e){
            openSnippet(e);
        }, false);
    }
    
}


function DeleteBookmark(arg){

    if(stateBookmark){
        var text = arg.target.id;
        var id = text.substring(6, text.length);
        //console.log("id bookmark: "+ id);
    
        let mensaje = {
            txt : "DeleteBookmark",
            idBookmark : id
        }
        detectBrowser.runtime.sendMessage(mensaje,   function (response) {
            //console.log(response);
        });
    
       var bookmarkElement = document.getElementById("url"+id);
       bookmarkElement.parentNode.parentNode.parentNode.removeChild(bookmarkElement.parentNode.parentNode);
    }

}

function DeleteSnipper(arg){

    if(stateSnipper){
        var text = arg.target.id;
        var id = text.substring(7, text.length);
        
        let mensaje = {
            txt : "DeleteSnipper",
            idSnipper : id
        }
        detectBrowser.runtime.sendMessage(mensaje,   function (response) {
            //console.log(response);
        });
    
        var snipperElement = document.getElementById("snipper"+id);
        snipperElement.parentNode.parentNode.parentNode.removeChild(snipperElement.parentNode.parentNode);
    }

}

function openLink(arg) {
    var text = arg.target.id; 
    var id = text.substring(4, text.length);
    console.log("id bookmark: "+ id);

    var urlBookmark = document.getElementById("url"+id);
    var link = urlBookmark.innerText;
    console.log("link: "+ link);

    detectBrowser.tabs.create({active: true, url: link});
}

function openSnippet(arg) {

    var link = arg.target.attributes.value.value;
    console.log(link);
    detectBrowser.tabs.create({active: true, url: link});

}
