import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function handleAppSubEvent(name, action) {
    socket.emit('add-application', name, action);
}

socket.on('application-added', function addApplication(name ) {
    // Add the clicked application to the list of my Apps.
    alert('Adding: ' + name);
});

socket.on('application-removed', function removeApplication(name ) {
    // Remove the clicked application from the list of my Apps.
    alert('Removing: ' + name);
});


export { handleAppSubEvent };