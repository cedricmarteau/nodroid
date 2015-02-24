// GLOBAL VAR
var obj = {
    x:0,
    y:0,
    z:0
  },
  socket = io.connect('http://arhockey.herokuapp.com');
  // socket = io.connect('http://localhost');

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
    var parsedData = $.parseJSON(data);
    console.log(data,parsedData)
    $("#main").find("ul").html("<li>x : "+parsedData.x+"</li><li>y : "+parsedData.y+"</li><li>z : "+parsedData.z+"</li>")
  });
  socket.on('UserConnection', function(data){
    var parsedData = $.parseJSON(data);
    console.log("UserConnection",data)
    $("#userconnected").find("span").html(parsedData.liveConnected);
  });
  socket.on('UserDisonnection', function(data){
    var parsedData = $.parseJSON(data);
    console.log("UserDisonnection",data)
    $("#userconnected").find("span").html(parsedData.liveConnected);
  });
  socket.on("hello",function(){
    $("#main").append("<div>Hello from Android</div>")
  });
};
