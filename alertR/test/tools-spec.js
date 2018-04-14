var expect = require('chai').expect;  
var app = require('../app.js');
var io = require('socket.io-client');

var socketUrl = 'http://localhost:3000',
  sender, 
  receiver;

    
var server,
    options ={
        transports: ['websocket'],
        'force new connection': true
    };

  describe("User Connections", function () {
       beforeEach(function (done) {
           // start the server
           server = require('../app').server;
           done();
     
       });

       it("Logs that a user has connected", function (done) {

        // Just fail until we can actually implement some tests.
        expect(1).to.equal(2);
        done();

        });

    });