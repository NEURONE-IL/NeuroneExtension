console.log("print.js extension go");

var Snippers = new Array();

document.addEventListener('DOMContentLoaded', Print);

function Print(){



    detectBrowser.runtime.sendMessage({txt: "getSnippers"}, function(response) {

        var actualUrl = window.location.toString();
        Snippers = response.result;

        if(Snippers.length > 0){
            for(s of Snippers){
                if(s.urlPage == actualUrl){
                    
                    var textMark = s.textHtml;
                    var r = new RegExp(textMark, 'g');
                
                    var parrafos = document.getElementsByTagName('p');
                    for(p of parrafos){
                        p.innerHTML = p.innerHTML.replace(r, '<mark>'+textMark+'</mark>');
                    }
                }
            }
    
        }

    });


}
