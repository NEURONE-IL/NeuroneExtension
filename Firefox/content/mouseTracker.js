console.log("mouseTracker.js extension go");

window.timePeriod = 100; // 60000 milisegundos = 1 min
var time = 100;
var capture = true;

//capture position when is mouve
window.addEventListener('mousemove' , mousePosition);

//capture position when the user click
window.addEventListener('click' , mouseClick);

//Set each lapse of time capture data
window.setTimeout(setCaptureTime, time);

//update time of lapse 
browser.runtime.sendMessage({txt: "getTimeCapture"}, function(response) {

    timePeriod = response.result;
    console.log("timePeriod: "+timePeriod);

});

function setCaptureTime() {

    capture = !capture;
    console.log(capture);
    time = timePeriod; // actually this will kill your browser when goes to 0, but shows the idea
    setTimeout( setCaptureTime, time );
}

function mousePosition(m){
    var width_win = window.innerWidth;
    var height_win = window.innerHeight;
    var width_doc = document.body.scrollWidth;
    var height_doc = document.body.scrollHeight;
    
    let mensaje = {
        txt : "mousePosition",
        x_win : m.clientX,
        y_win : m.clientY,
        w_win : width_win,
        h_win : height_win,
        x_doc : m.pageX,
        y_doc : m.pageY,
        w_doc : width_doc,
        h_doc : height_doc
    };
    
    if(capture){
        browser.runtime.sendMessage(mensaje, function (response) {
            //console.log(response);
        }); 
    }

}

function mouseClick(m){
    var width_win = window.innerWidth;
    var height_win = window.innerHeight;
    var width_doc = document.body.scrollWidth;
    var height_doc = document.body.scrollHeight;
    
    let mensaje = {
        txt : "mouseclick",
        x_win : m.clientX,
        y_win : m.clientY,
        w_win : width_win,
        h_win : height_win,
        x_doc : m.pageX,
        y_doc : m.pageY,
        w_doc : width_doc,
        h_doc : height_doc
    };
    
    if(capture){
        browser.runtime.sendMessage(mensaje, function (response) {
            //console.log(response);
        });     
    }

}