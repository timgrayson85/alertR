var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

});

app.use(express.static('./public'));


io.on('connection', function (socket) {

    // Get a unique identifer for this client.
    var ip = socket.conn.remoteAddress;
    console.log('User: ' + ip + ' has connected');
        
    // Create a new room for this client.
    socket.join(ip + '-room');
        
    // Listen for an 'addApplication' event then push it to all sockets assigned to the client. 
    // This is necessary in case the user has multiple tabs or browsers open.
    socket.on('addApplication', function (app) {
        io.to(ip+'-room').emit('application-added', app);
        console.log('User ' + ip + ' added: ' + app + ' to their apps');
               
    });



        
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});




http.listen(8080, function () {
    console.log('listening on *:8080');
});