/**
 * Main application file
 */

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Read environment variables
var env = require('node-env-file');
env('.env');

// Connect to MongoDB
mongoose.connect([process.env.MONGO_URL]);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
mongoose.connection.once('open', function() {
  console.error('Successfully connected to MongoDB!');
})

// Start server
var app = express();
var server = http.createServer(app);
var port = Number(process.env.PORT || 3000);
server.listen(port);
console.log("Server running on port " + port);

app.use(express.static(process.env.APP_PATH));
app.use(bodyParser.json());

// Load routes
//require('./routes')(app);
