console.log("print.js extension go");

/*////////////////////////////////////////////////////////////////
                            Listeners
////////////////////////////////////////////////////////////////*/

document.addEventListener('DOMContentLoaded', Print);

/*////////////////////////////////////////////////////////////////
                            Functions
////////////////////////////////////////////////////////////////*/

function Print(){

    detectBrowser.runtime.sendMessage({txt: "getSnippers"}, function(response) {

        var actualUrl = window.location.toString();
        var data = response.result;

        var Snippers = JSON.parse(data);
        
        if(Snippers.length > 0){
            for(s of Snippers){

                if(s.urlPage == actualUrl){

                    var textMark = s.textHtml;
                    var parrafos = document.getElementsByTagName('p');

                    for(let p of Array.from(parrafos)){

                        let replacetext = p.innerHTML.replace(new RegExp(textMark, "g") , "<mark>"+textMark+"</mark>");

                        p.innerHTML = replacetext;
                    }
                }
            }
    
        }
        

    });


}
