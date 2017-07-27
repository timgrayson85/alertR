var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var port = process.env.PORT || 3000;


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

});

// Make JavaScript and CSS files available.
app.use(express.static('./public'));

// Connect to MySQL Database.
var con = mysql.createConnection({
    host: "localhost",
    user: "tim",
    password: "******",
    database: "mydb"
});


// Set up Database.
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

    con.query("CREATE TABLE IF NOT EXISTS Alert (idAlert INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(45), Severity VARCHAR(45), Colour VARCHAR(45))", function (err, result) {
            if (err) throw err;
            console.log("Alert table created");
        });

    con.query("DELETE FROM Alert", function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        });

    con.query("INSERT INTO Alert (idAlert, Name, Severity, Colour) VALUES (1,'Critical', 'Critical', 'Red'),(2,'Warning', 'Warning', 'Amber'),(3,'Info', 'Info', 'Blue'),(4,'OK', 'OK', 'Green') ", function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });

    con.query("CREATE TABLE IF NOT EXISTS Applications (idApplications INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(45), Location VARCHAR(45))", function (err, result) {
            if (err) throw err;
            console.log("Applications table created");
        });

    con.query("DELETE FROM Applications", function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
        });

    con.query("INSERT INTO Applications (idApplications, Name, Location) VALUES (1,'TradeX', 'Front Office'),(2,'Book3000', 'Front Office'),(3,'LegalCheck', 'Middle Office'),(4,'DataFaker', 'Middle Office'),(5,'RiskAnalyser', 'Back Office'),(6,'Accounter', 'Back Office')", function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });

    con.query("CREATE TABLE IF NOT EXISTS History (ApplicationID INT, AlertID INT, Date DATETIME)", function (err, result) {
            if (err) throw err;
            console.log("History table created");
        });   

});



io.on('connection', function (socket) {

    // Get a unique identifer for this client.
    var ip = socket.conn.remoteAddress;
    console.log('User: ' + ip + ' has connected');

    // Create a new room for this client.
    socket.join(ip + '-room');

    // Listen for an 'addApplication' event then push it to all sockets assigned to the client. 
    // This is necessary in case the user has multiple tabs or browsers open.
    socket.on('add-application', function (app) {
        io.to(ip + '-room').emit('application-added', app);
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
    // Put a friendly message on the terminal
    console.log('Server running at http://127.0.0.1:' + port + '/');

});