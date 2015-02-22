window.onload=function(){
	logDiv = document.getElementById("log");
}

var logDiv;
var log = function(){ console.log(arguments);logDiv.innerHTML+=arguments[0]+"<BR>"; }
var socket = io.connect('http://localhost'); // 1

socket.on('connect', function() { // 2
  log('connected');
  socket.emit('msg send', 'data'); // 3
  socket.on('msg push', function (msg) { // 7

		  dt = new Date();

		  var msgCont = "";
		  var time = dt;
		  var sprt = ": ";
		  var sprt2 = " || ";
		  var accountName = "user01";
		  msgCont += time;
		  msgCont += sprt2;
		  msgCont += accountName;
		  msgCont += sprt;
		  msgCont += msg;

    log(msgCont); // 8
	
  });
});

function ping(){
  var text = document.getElementById("text").value;
  socket.emit('msg send', text); // 3
}