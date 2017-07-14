var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

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

    // Alert all clients that a critical alert has been raised on an application.
    socket.on('critical-alert', function (json) {
        io.emit('critical-alert-raised', json);
        console.log('A critical alert has been raised on ' + json.Name);

    });

    // Alert all clients that a warning alert has been raised on an application.
    socket.on('warning-alert', function (json) {
        io.emit('warning-alert-raised', json);
        console.log('A warning alert has been raised on ' + json.Name);

    });

    // Alert all clients that a information alert has been raised on an application.
    socket.on('info-alert', function (json) {
        io.emit('info-alert-raised', json);
        console.log('A info alert has been raised on ' + json.Name);

    });

    // Alert all clients that a success alert has been raised on an application.
    socket.on('success-alert', function (json) {
        io.emit('success-alert-raised', json);
        console.log('A success alert has been raised on ' + json.Name);

    });


        
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});




http.listen(port, function () {
    console.log('listening on *:8080');
});