var path = require('path');
var express = require('express');

var routes = require('./routes');

var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

var server = app.listen(6767);
console.log('Listening on 6767');

/*var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, {debug: true});

app.use('/api', peerserver);

server.listen(6767);*/

var options = {
    debug: true
}
 
var peerserver = ExpressPeerServer(server, options);

app.use('/api', peerserver);