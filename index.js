var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var request = require('request');
// var compression = require('compression');


// http.use(compression());

var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

var uri = 'https://www.reddit.com/r/nba/top.json?limit=10';


app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});


// setInterval(function (){

//   request(uri, function (error, res, body){

//     if(!error && res.statusCode == 200) {

//       var jsonObj = JSON.parse(body);
//       var topics = [];

//       jsonObj.data.children.forEach(function(child) {

//         console.log('Title : ' + child.data.title);
//         console.log('URL : ' + child.data.url);

//         var topic = {'title' : child.data.title, 'url' : child.data.url};

//         topics.push(topic);
//       });

//       var rand = Math.floor(Math.random()*topics.length);
//       io.emit('topic change', topics[rand]);
//     }
//   })
// }
// , 10000);


io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('msg', function(msg) {
    if (typeof(msg) === 'object' && containsValidText(msg))
      io.emit('msg', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});


http.listen(port, function() {
  console.log('Node app is running on port', port);
});


//Takes object as parameter and checks if it contains valid text
function containsValidText(msg) {
  if (msg.hasOwnProperty('text') && typeof(msg.text) === 'string')
    return true;
  return false;
}


