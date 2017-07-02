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
function raiseCriticalAlert(name, alertLevel, alertMessage) {
    //alert(alertText);
    socket.emit('critical-alert', { Name: name, AlertLevel: alertLevel, AlertMessage: alertMessage });
};

// Raise a warning alert for an applicaiton.
function raiseWarningAlert(name, alertLevel, alertMessage) {
    socket.emit('warning-alert', { Name: name, AlertLevel: alertLevel, AlertMessage: alertMessage });
};

// Raise a information alert for an applicaiton.
function raiseInfoAlert(name, alertLevel, alertMessage) {
    socket.emit('info-alert', { Name: name, AlertLevel: alertLevel, AlertMessage: alertMessage });
};

// Raise a success alert for an applicaiton.
function raiseSuccessAlert(name, alertLevel, alertMessage) {
    socket.emit('success-alert', { Name: name, AlertLevel: alertLevel, AlertMessage: alertMessage });
};


socket.on('critical-alert-raised', function changeStyle(data) {
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');

    //alert(data.alertLevel);


    // Loop through all list items, and change the status of the application
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].cells[0].textContent == data.Name) {
            rows[i].style.backgroundColor = '#f44336';
            rows[i].cells[1].textContent = data.AlertLevel;
            rows[i].cells[2].textContent = data.AlertMessage;

        }
    }
});

socket.on('warning-alert-raised', function changeStyle(data) {
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].cells[0].textContent == data.Name) {
            rows[i].style.backgroundColor = '#ff9800';
            rows[i].cells[1].textContent = data.AlertLevel;
            rows[i].cells[2].textContent = data.AlertMessage;
        }
    }
});

socket.on('info-alert-raised', function changeStyle(data) {
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].cells[0].textContent == data.Name) {
            rows[i].style.backgroundColor = '#2196F3';
            rows[i].cells[1].textContent = data.AlertLevel;
            rows[i].cells[2].textContent = data.AlertMessage;
        }
    }
});

socket.on('success-alert-raised', function changeStyle(data) {
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].cells[0].textContent == data.Name) {
            rows[i].style.backgroundColor = '#4CAF50';
            rows[i].cells[1].textContent = data.AlertLevel;
            rows[i].cells[2].textContent = data.AlertMessage;
        }
    }
});


socket.on('subscription-added', function addApplicationToSubs(name) {
    // Add the clicked application to the list of my Apps.
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');
    var found = 0;

     //Check if the user is already subscribed before adding this application.
    if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].textContent == name) {
                found++;
            }
        }
    }

         if (found > 0) {
             alert('You are already subscribed to ' + name);
        }
         else {
             // Add the application to the top of the table.
             var row = table.insertRow(-1);
             var cell1 = row.insertCell(0);
             var cell2 = row.insertCell(1);
             var cell3 = row.insertCell(2);
             
             cell1.innerHTML = name;
             cell2.innerHTML = "";
             cell3.innerHTML = ""; 
        }  
});



socket.on('application-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    var table = document.getElementById("myApps");
    var rows = table.getElementsByTagName('tr');

    var button = document.createElement("button");
    button.innerHTML = "Raise Alert";
    var found = 0;
    
    // Check if the user is already subscribed before adding this application.
    if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            // Substring required to trim off 'Raise Alert' text.
            if (rows[i].cells[0].textContent == name) {
                found++;
            }
        }
    }


    if (found > 0) {
        alert('You already have ' + name + ' in your applications');
    }
    else {
        // Add the application to the list.
        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = name;
        cell2.appendChild(button);
        
        cell2.addEventListener("click", function () {
            var myWindow = window.open("alertdialog.html?" + name, "", "width=300,height=500");
        })


    }
  
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