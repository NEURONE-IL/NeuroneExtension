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
  
        var div_row =document.createElement("div");
        div_row.setAttribute('class','row');
        var div_c1 =document.createElement("div");
        div_c1.setAttribute('class','col-sm-10 ');
        var div_c2 =document.createElement("div");
        div_c2.setAttribute('class','col-sm-1');
        var div_der =document.createElement("div");
        div_der.setAttribute('class','well pull-right');

        var name_b = document.createElement("p");
        name_b.setAttribute('id','url'+favoriteBookmarks.indexOf(b)+'');
        name_b.innerText = b.urlpage;

        var button_b = document.createElement("button");
        button_b.setAttribute('type','button');
        button_b.setAttribute('id','delete'+favoriteBookmarks.indexOf(b)+'');
        button_b.setAttribute('class','btn btn-primary');
        button_b.setAttribute('value', favoriteBookmarks.indexOf(b) );
        button_b.innerText = "delete";
        
        newList.appendChild(li);
        li.appendChild(div_c1);
        div_c1.appendChild(name_b);
        li.appendChild(div_c2);
        div_c2.appendChild(div_der);
        div_der.appendChild(button_b);
         
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
        div_c3.setAttribute('class','col-sm-10');
        var div_c4 =document.createElement("div");
        div_c4.setAttribute('class','col-sm-1 float-right');

        var name_s = document.createElement("p");
        name_s.setAttribute('id','snipper'+favoriteSnippers.indexOf(s)+'');
        name_s.innerText = s.text;

        var button_s = document.createElement("button")
        button_s.setAttribute('type','button');
        button_s.setAttribute('id','deletes'+favoriteSnippers.indexOf(s)+'');
        button_s.setAttribute('class','btn btn-primary');
        button_s.innerText = "delete";

        ul.appendChild(li);
        li.appendChild(div_c3);
        div_c3.appendChild(name_s);
        li.appendChild(div_c4);
        div_c4.appendChild(button_s);
    }

    //select bookmark for delete
    for(fb of favoriteBookmarks){
        //console.log(favoriteBookmarks.indexOf(fb))
        document.getElementById("delete"+favoriteBookmarks.indexOf(fb)).addEventListener("click", function(e){
            DeleteBookmark(e);
        }, false);
    }

    //select Snippers for delete
    for(s of favoriteSnippers){
        //console.log(favoriteBookmarks.indexOf(fb))
        document.getElementById("deletes"+favoriteSnippers.indexOf(s)).addEventListener("click", function(e){
            DeleteSnipper(e);
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

