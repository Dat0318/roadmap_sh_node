import http from 'http';
import express from 'express';
import request from 'request';
import jade from 'jade';

var app = express();

app.set('view engine','jade');

app.route('/Node').get(function (req, res) {
  res.send('Tutorial on Node');
});
app.route('/Angular').get(function (req, res) {
  res.send('Tutorial on Angular');
});
app.get('/', function (req, res) {
  res.render('index', { title: 'Guru99', message: 'Welcome' });
});

app.listen(3000, function () {});

// request('http://www.google.com', function (error, response, body) {
//   console.log(response);
// });

// var server = http.createServer(function (request, response) {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Hello World\n');
// });
// server.listen(7000);
