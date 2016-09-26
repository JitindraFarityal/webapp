var express = require("express");
var path = require("path");
var bodyParser = require("body-parser")
var app = express();

// configure the app

app.set('view engine','.ejs');
app.set('views',path.join(__dirname,'views'));

// use the middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname,'client')));

// define the routes

var index = require('./routers/index');

app.use('/',index);

// start the server

var port = process.env.PORT || 8080

app.listen(port,function(){
  console.log('Server started running on port ',port);
});