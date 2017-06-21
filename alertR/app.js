var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
});



io.on('connection', function (socket) {

    var ip = socket.conn.remoteAddress;
    console.log('User: ' + ip + ' has connected');
 
    // Listed to an addApplication event then log it.
    socket.on('addApplication', function (app) {
        console.log('User ' + ip + ' added: ' + app + ' to their apps');
    });



        
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});




http.listen(8080, function () {
    console.log('listening on *:8080');
});