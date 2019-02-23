console.log("Snipper.js extension go");

//save snipper and send to contextMenu.js
window.addEventListener('mouseup' , fragmentOfText);

function fragmentOfText(){
    
    let textSelect = window.getSelection().toString().trim();
    var range = window.getSelection().getRangeAt(0);
    var selectionContents = range.cloneContents();
    var div = document.createElement("div");
    div.appendChild(selectionContents);

    if(textSelect.length > 0){
        let mensaje = {
            txt : "textMouseup",
            text: textSelect,
            textHtml: div.innerHTML
        };

        //console.log(textSelect);

        browser.runtime.sendMessage(mensaje, function (response) {
            //console.log(response);
        });

    }

}