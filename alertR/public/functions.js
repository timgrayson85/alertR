var socket = io();

// Emit an event when a user adds an application to their list. 
function addAppEvent(name) {
    socket.emit('add-application', name);
};

// Emit an event when a user subscribes to an application. 
function addSubEvent(name) {
    socket.emit('add-subscription', name);
};


// Raise a critical alert for an applicaiton.
function raiseCriticalAlert(name) {
     socket.emit('critical-alert', name);
};

// Raise a warning alert for an applicaiton.
function raiseWarningAlert(name) {
    socket.emit('warning-alert', name);
};

// Raise a information alert for an applicaiton.
function raiseInfoAlert(name) {
    socket.emit('info-alert', name);
};

// Raise a success alert for an applicaiton.
function raiseSuccessAlert(name) {
    socket.emit('success-alert', name);
};


socket.on('critical-alert-raised', function changeStyle(name) {
    var ul = document.getElementById("mySubs");
    var li = ul.getElementsByTagName('li');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < li.length; ++i) {
        if (li[i].innerText == name) {
            li[i].style.color = "red";
        }
    }
        // do something with items[i], which is a <li> element
    });




socket.on('subscription-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    var ul = document.getElementById("mySubs");
    var li = document.createElement("li");
    //var button = document.createElement("button");
    //button.innerHTML = "asdasd";
    //li.appendChild(button);
    li.appendChild(document.createTextNode(name));
    //li.addEventListener("click", function () { alert(name);})
    ul.appendChild(li);
});


socket.on('application-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    var ul = document.getElementById("myApps");
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.innerHTML = "Raise Alert";
    li.appendChild(document.createTextNode(name));
    li.addEventListener("click", function () {
        var myWindow = window.open("alertdialog.html?" + name, "", "width=300,height=500");
    })

    li.appendChild(button);
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


