var socket = io();

function addAppEvent(name) {
    socket.emit('addApplication', name);
}

socket.on('application-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    var ul = document.getElementById("myApps");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(name));
    //li.addEventListener("click", function () { alert(name);})
    ul.appendChild(li);
});


function searchApps() {
    // Declare variables.
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


socket.on('some event', function (msg) {
    alert("joined room");
});