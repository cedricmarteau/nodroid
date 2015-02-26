var io = require('socket.io')({
  transports: ['websocket'],
});

io.attach(5000);

var user = {
  liveConnected : 0
};

io.on('connection', function(socket){
  console.log('a user connected');
  user.liveConnected++;
  console.log("userConnected", user)
  
  socket.on('disconnect', function(){
    user.liveConnected--;
    console.log("userDisconnected", user)
    socket.emit('UserDisconnection', user);
  });
  
  socket.on('hello', function() {
    console.log('hello');
    
    socket.emit('ball', { x : 0, y : 0, z : 0 });
  });
});
