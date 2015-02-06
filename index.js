var http = require('http'),
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  port = process.env.PORT || 5000,
  call = {};
  call.sound = true;
 
app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.sendfile('public/index.html');
});

app.post('/gestures',function(request,response){
  console.log('New gesture' + request.body.action);
  response.json({success: true, actionReceived: request.body.action});
});
 
app.get(/^(.+)$/, function(req, res) {
  res.sendfile('public/' + req.params[0]);
});
 
server.listen(port, function() {
  console.log('Listening on ' + port);
});
