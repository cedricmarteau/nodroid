// GLOBAL VAR
var obj = {
    x:0,
    y:0,
    z:0
  },
  socket = io.connect('http://arhockey.herokuapp.com');

mouselistener();
testServer();

function mouselistener(){
  window.addEventListener("mousemove",function(e){
    obj.x = e.clientX;
    obj.y = e.clientY;
    socket.emit('HandPosition', obj);
  });
}

function testServer(){
  socket.on('HandPosition', function(data){
    var data = $.parseJSON('data');
    console.log(data)
    $("#main").find("ul").html("<li>x : "+data.x+"</li><li>y : "+data.y+"</li><li>z : "+data.z+"</li>")
  });
  socket.on('UserConnection', function(data){
    console.log("UserConnection",data)
    $("#userconnected").find("span").html(data.liveConnected);
  });
  socket.on('UserDisonnection', function(data){
    console.log("UserDisonnection",data)
    $("#userconnected").find("span").html(data.liveConnected);
  });
  socket.on("hello",function(){
    $("#main").append("<div>Hello from Android</div>")
  });
};
