var socket = io();

// Emit an event when a user adds an application to their list. 
function addAppEvent(name) {
    socket.emit('add-application', name);
}

function removeAppEvent(name) {
    socket.emit('remove-application', name);
}

// Emit an event when a user removes an application from their list. 
function removeSubEvent(name) {
    socket.emit('remove-subscription', name);
}

// Emit an event when a user subscribes to an application. 
function addSubEvent(name) {
    socket.emit('add-subscription', name);
}

// Emit an event when a user raises an alert on an application.
function raiseAlert(name, alertLevel, alertMessage) {
    socket.emit('alert-raised', { Name: name, AlertLevel: alertLevel, AlertMessage: alertMessage });
}

socket.on('alert-raised', function (data) {
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');

    // Loop through all list items, and change the status of the application
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].cells[0].textContent == data.Name) {

            switch (data.AlertLevel) {
                case "Critical":
                    rows[i].style.backgroundColor = '#f44336';
                    break;
                case "Warning":
                    rows[i].style.backgroundColor = '#ff9800';
                    break;
                case "Information":
                    rows[i].style.backgroundColor = '#2196F3';
                    break;
                case "Success":
                    rows[i].style.backgroundColor = '#4CAF50';
                    break;
            }

            rows[i].cells[1].textContent = data.AlertLevel;
            rows[i].cells[2].textContent = data.AlertMessage;

            var d = new Date();
            rows[i].cells[3].textContent = d.toLocaleString("en-GB").replace(',','');
        }
    }
});

socket.on('subscription-added', function addApplicationToSubs(data) {
    // Add the clicked application to the list of my Apps.
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');
    var found = 0;
    var name = data.Name;

    //Check if the user is already subscribed before adding this application.
    if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].textContent == data.Name) {
                found++;
            }
        }
    }

    if (found > 0) {
        alert('You are already watching ' + data.Name);
    }
    else {
        // Add the application to the top of the table.
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = data.Name;
        cell2.innerHTML = data.AlertLevel;

        // Repace 'undefined' with an empty string.
        if (data.AlertMessage == undefined) {
            cell3.innerHTML = "";
        }
        else {
            cell3.innerHTML = data.AlertMessage;
        }

        cell4.innerHTML = data.AlertDate;

        var removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";

        cell5.appendChild(removeButton); 
        
        removeButton.addEventListener("click", function () {
            removeSubEvent(name);
        });

        switch (data.AlertLevel) {
            case "Critical":
                row.style.backgroundColor = '#f44336';
                break;
            case "Warning":
                row.style.backgroundColor = '#ff9800';
                break;
            case "Information":
                row.style.backgroundColor = '#2196F3';
                break;
            case "Success":
                row.style.backgroundColor = '#4CAF50';
                break;
        }
    }
});

socket.on('application-added', function addApplication(name) {
    // Add the clicked application to the list of my Apps.
    var table = document.getElementById("myApps");
    var rows = table.getElementsByTagName('tr');

    var button = document.createElement("button");
    button.innerHTML = "Raise Alert";

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";

    var found = 0;

    // Check if the user is already subscribed before adding this application.
    if (rows.length > 0) {
        for (var i = 1; i < rows.length; i++) {
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

        cell1.innerHTML = name;
        cell2.appendChild(button);
        cell2.appendChild(removeButton);

        }

        button.addEventListener("click", function () {
            var myWindow = window.open("alertdialog.html?" + name, "", "width=300,height=500");
        });


        removeButton.addEventListener("click", function () {
            removeAppEvent(name);
        });
});

socket.on('application-removed' , function removeApplication (name) {
    var table = document.getElementById("myApps");
    var rows = table.getElementsByTagName('tr');

        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[0].textContent == name) {
                table.deleteRow(i);
            }
        }  
});

socket.on('subscription-removed' , function removeSubscription (name) {
    var table = document.getElementById("mySubs");
    var rows = table.getElementsByTagName('tr');

        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[0].textContent == name) {
                table.deleteRow(i);
            }
        }  
});

function searchApps() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myTable");
    li = ul.getElementsByTagName('tr');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("td")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

