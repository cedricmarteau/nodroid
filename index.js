var express = require('express');
var http = require('http');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000;
var io = require('socket.io').listen(server);

app.use(express.bodyParser());

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.get(/^(.+)$/, function(req, res) {
  res.sendfile('public/' + req.params[0]);
});

var user = {
	liveConnected : 0
};

io.sockets.on('connection', function(socket){
  console.log('a user connected');
  	user.liveConnected++;
  	console.log("userConnected",user.liveConnected)
  	socket.emit('UserConnection',user);
  socket.on('disconnect', function(){
  	user.liveConnected--;
  	console.log("userDisconnected",user.liveConnected)
  	socket.emit('UserDisonnection',user);
  });
  socket.on('HandPosition', function(data){
    console.log('HandPosition: ' + data);
    socket.emit('HandPosition', JSON.stringify(data));
  });
});

server.listen(port, function(){
  console.log('listening on *:5000');
});
