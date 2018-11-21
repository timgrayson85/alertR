var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var ip = require('ip');

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

    // Listen for an 'add-Application' event then push it to all sockets assigned to the client. 
    // This is necessary in case the user has multiple tabs or browsers open.
    socket.on('add-application', function (app) {
        io.to(ip + '-room').emit('application-added', app);
        console.log('User ' + ip + ' added: ' + app + ' to their apps');
    });

    socket.on('remove-application', function (app) {
        io.to(ip + '-room').emit('application-removed', app);
        console.log('User ' + ip + ' removed: ' + app + ' from their apps');
    });

    socket.on('remove-subscription', function (app) {
        io.to(ip + '-room').emit('subscription-removed', app);
        console.log('User ' + ip + ' removed: ' + app + ' from their subscriptions');
    });   

    // Listen for an 'add-subscription' event then push it to all sockets assigned to the client.
    // This is necessary in case the user has multiple tabs or browsers open.
    socket.on('add-subscription', function (app) {

        //Get the current status of this applicaion.
        // con.query("select h.ApplicationName, h.AlertName, DATE_FORMAT(h.Date, '%m/%d/%Y %H:%i:%S') as Date, Description from mydb.history h inner join " +
        //     "(select ApplicationName, max(Date) as MaxDate from mydb.history group by ApplicationName) " +
        //     "an on h.ApplicationName = an.ApplicationName and h.Date = an.MaxDate and an.ApplicationName = '" + app + "'", function (err, result, fields) {
        //         if (err) throw err;
        //         var alertLevel = result[0].AlertName;
        //         var alertDate = result[0].Date;
        //         var alertMessage = result[0].Description;

                io.to(ip + '-room').emit('subscription-added', { Name: app, AlertLevel: alertLevel, AlertDate: alertDate, AlertMessage: alertMessage  });
                console.log('User ' + ip + ' subscribed to: ' + app);
            // });
    });

    // Alert all clients that an alert has been raised on an application.
    socket.on('alert-raised', function (json) {

        // Write alert to database.
        // con.query("INSERT INTO History (ApplicationName, AlertName, Date, Description) VALUES ('" + json.Name + "','" + json.AlertLevel + "', NOW(), '" + json.AlertMessage + "')", function (err, result) {
        //     if (err) throw err;
        //     console.log("Number of records inserted: " + result.affectedRows);
        // });

        io.emit('alert-raised', json);
        console.log(json.AlertLevel + ' alert has been raised on ' + json.Name);

    });

    socket.on('get-application-stats', function (app) {
        con.query("select Date, count(*) from history where ApplicationName = '" + app + "' group by MONTH(Date) order by Date desc", function (err, results) {
            if  (err) throw err;

            io.to(ip + '-room').emit('stats-returned', results);
            alert(results);
        });
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

http.listen(port, function () {
    // Put a friendly message on the terminal
    console.log('Server running at http://' + ip.address() +':' + port + '/');
});

