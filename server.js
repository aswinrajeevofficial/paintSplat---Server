var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ // connect to pusher
  appId: process.env.APP_ID, 
  key: process.env.APP_KEY, 
  secret:  process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER, 
});

app.get('/', function(req, res){ // for testing if the server is running
  res.send('all is well...');
});

app.post("/pusher/auth", function(req, res) {
  console.log(req);
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);