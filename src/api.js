import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function addAppEvent(name) {
    socket.emit('add-application', name);
}

socket.on('application-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    alert(name);
});


export { addAppEvent };