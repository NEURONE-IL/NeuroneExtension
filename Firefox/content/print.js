console.log("print.js extension go");

var Snippers = new Array();

document.addEventListener('DOMContentLoaded', Print);

function Print(){

    browser.runtime.sendMessage({txt: "getSnippers"}, function(response) {

        var actualUrl = window.location.toString();
        Snippers = response.result;

        if(Snippers.length > 0){
            for(s of Snippers){

                console.log(s);

                if(s.urlPage == actualUrl){
                    
                    let textMark = s.textHtml;
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
