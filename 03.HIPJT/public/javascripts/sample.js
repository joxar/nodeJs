window.onload=function(){
	logDiv = document.getElementById("log");
}

var logDiv;

// editted by snuf
var log = function(){
    console.log(arguments);
    logDiv.innerHTML=arguments[0]+"<BR>"+logDiv.innerHTML;
}
//var log = function(){ console.log(arguments);logDiv.innerHTML+=arguments[0]+"<BR>"; }

//var socket = io.connect('http://localhost'); // 1
var socket = io.connect('http://192.168.100.100'); // 1

socket.on('connect', function() { // 2
    log('connected');
    socket.emit('msg send', 'data'); // 3
    socket.on('msg push', function (msg) { // 7
        log(msg); // 8
    });
});

function say(){
    var text = document.getElementById("text").value;
    socket.emit('msg send', text); // 3
}

function say(keyCode){
	if (13 === keyCode) {
		var text = document.getElementById("text").value;
		socket.emit('msg send', text); // 3
	}
}


