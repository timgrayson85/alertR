﻿var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

});

// Make JavaScript and CSS files available.
app.use(express.static('./public'));



io.on('connection', function (socket) {

    // Get a unique identifer for this client.
    var ip = socket.conn.remoteAddress;
    console.log('User: ' + ip + ' has connected');
        
    // Create a new room for this client.
    socket.join(ip + '-room');
        
    // Listen for an 'addApplication' event then push it to all sockets assigned to the client. 
    // This is necessary in case the user has multiple tabs or browsers open.
    socket.on('add-application', function (app) {
        io.to(ip+'-room').emit('application-added', app);
        console.log('User ' + ip + ' added: ' + app + ' to their apps');
               
    });

    // Listen for an 'add-subscription' event then push it to all sockets assigned to the client.
    // This is necessary in case the user has multiple tabs or browsers open.
    socket.on('add-subscription', function (app) {
        io.to(ip + '-room').emit('subscription-added', app);
        console.log('User ' + ip + ' subscribed to: ' + app);

    });


    socket.on('critical-alert', function (app) {
        io.emit('critical-alert-raised', app);
        console.log('A critical alert has been raised on ' + app);

    });

    socket.on('warning-alert', function (app) {
        io.emit('warning-alert-raised', app);
        console.log('A warning alert has been raised on ' + app);

    });

    socket.on('info-alert', function (app) {
        io.emit('info-alert-raised', app);
        console.log('A info alert has been raised on ' + app);

    });


    socket.on('success-alert', function (app) {
        io.emit('success-alert-raised', app);
        console.log('A success alert has been raised on ' + app);

    });


        
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});




http.listen(8080, function () {
    console.log('listening on *:8080');
});