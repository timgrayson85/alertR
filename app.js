const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);
const { initDb, queries } = require('./db-setup');
const ip = require('ip');
const path = require('path');

const port = process.env.PORT || 3001;

// Initialise database before starting server
initDb().then(() => {
    
    app.use(cors());
    
    // Serve React build in production
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    // API endpoint to get applications
    app.get('/api/applications', function (req, res) {
        res.json(queries.getApplications());
    });

    // API endpoint to get alert levels
    app.get('/api/alert-levels', function (req, res) {
        res.json(queries.getAlertLevels());
    });

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build'));
    });

    io.on('connection', function (socket) {

        // Get a unique identifier for this client.
        const clientIp = socket.conn.remoteAddress;
        console.log('User: ' + clientIp + ' has connected');

        // Create a new room for this client.
        socket.join(clientIp + '-room');

        // Listen for an 'add-Application' event then push it to all sockets assigned to the client.
        // This is necessary in case the user has multiple tabs or browsers open.
        socket.on('add-application', function (app) {
            io.to(clientIp + '-room').emit('application-added', app);
            console.log('User ' + clientIp + ' added: ' + app + ' to their apps');
        });

        socket.on('remove-application', function (app) {
            io.to(clientIp + '-room').emit('application-removed', app);
            console.log('User ' + clientIp + ' removed: ' + app + ' from their apps');
        });

        socket.on('remove-subscription', function (app) {
            io.to(clientIp + '-room').emit('subscription-removed', app);
            console.log('User ' + clientIp + ' removed: ' + app + ' from their subscriptions');
        });

        // Listen for an 'add-subscription' event then push it to all sockets assigned to the client.
        // This is necessary in case the user has multiple tabs or browsers open.
        socket.on('add-subscription', async function (appName) {
            try {
                const result = queries.getLatestAlert(appName);
                
                if (result) {
                    const alertDate = new Date(result.date).toLocaleString();
                    io.to(clientIp + '-room').emit('subscription-added', {
                        name: result.applicationName,
                        alertLevel: result.alertName,
                        alertDate: alertDate,
                        alertMessage: result.description
                    });
                    console.log('User ' + clientIp + ' subscribed to: ' + appName);
                } else {
                    // No history for this app, subscribe with default OK status
                    io.to(clientIp + '-room').emit('subscription-added', {
                        name: appName,
                        alertLevel: 'OK',
                        alertDate: new Date().toLocaleString(),
                        alertMessage: 'No alerts'
                    });
                    console.log('User ' + clientIp + ' subscribed to: ' + appName + ' (no history)');
                }
            } catch (err) {
                console.error('Error subscribing to application:', err);
            }
        });

        // Alert all clients that an alert has been raised on an application.
        socket.on('alert-raised', async function (json) {
            try {
                // Write alert to database.
                await queries.addAlert(json.Name, json.AlertLevel, json.AlertMessage);
                console.log('Alert recorded for ' + json.Name);
                
                io.emit('alert-raised', {
                    Name: json.Name,
                    AlertLevel: json.AlertLevel,
                    AlertMessage: json.AlertMessage
                });
                console.log(json.AlertLevel + ' alert has been raised on ' + json.Name);
            } catch (err) {
                console.error('Error recording alert:', err);
            }
        });

        socket.on('get-application-stats', function (appName) {
            try {
                const results = queries.getAppStats(appName);
                io.to(clientIp + '-room').emit('stats-returned', results);
            } catch (err) {
                console.error('Error getting stats:', err);
            }
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

    });

    http.listen(port, function () {
        // Put a friendly message on the terminal
        console.log('Server running at http://' + ip.address() + ':' + port + '/');
    });

}).catch(err => {
    console.error('Failed to initialise database:', err);
    process.exit(1);
});