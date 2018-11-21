var mysql = require('mysql');


// Connect to MySQL Database.
var con = mysql.createConnection({
    host: "localhost",
    user: "tim",
    password: "tim", // Replace me.
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

    con.query("CREATE TABLE IF NOT EXISTS History (ApplicationName VARCHAR(45) , AlertName VARCHAR(45), Date DATETIME, Description VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("History table created");
    });

});


module.exports = con;