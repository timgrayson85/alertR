const io = require('socket.io')();
var ip = require('ip');

io.on('connection', (client) => {
    
    // Get a unique identifer for this client.
    var ip = client.conn.remoteAddress;
    console.log('User: ' + ip + ' has connected');

    // Create a new room for this client.
    client.join(ip + '-room');

    // Listen for an 'add-Application' event then push it to all sockets assigned to the client. 
    // This is necessary in case the user has multiple tabs or browsers open.
    client.on('add-application', function (app, action) {

        if (action) {
            io.to(ip + '-room').emit('application-added', app);
            console.log('User ' + ip + 'added ' + app + ' to their apps');
        }
        else
        {
            io.to(ip + '-room').emit('application-removed', app);
            console.log('User ' + ip + 'removed ' + app + ' from their apps');
        }

    });

    client.on('disconnect', function () {
        console.log('user disconnected');
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);