'use strict'

var expect = require('chai').expect, 
    io = require('socket.io-client'),
    ioOptions = { 
      transports: ['websocket'], 
      forceNew: true, 
      reconnection: false
  }, 
    sender, 
    receiver;

describe('Testing alertR', function(){
  beforeEach(function(done){
    // connect two io clients
    sender = io('http://localhost:3000/', ioOptions);    
    receiver = io('http://localhost:3000/', ioOptions);    
    // finish beforeEach setup
    done();
  });

  afterEach(function(done){
    // disconnect io clients after each test
    sender.disconnect();
    receiver.disconnect();
    done();
  });

  describe('Emit Events', function(){
    it('Clients should receive correct message when the `alert-raised` event is emited.', function(done){
      sender.emit('alert-raised', { Name: 'Test Application', AlertLevel: 'Critical', AlertMessage: 'Hardware failure'});
      receiver.on('alert-raised', function(msg){
        expect(msg.Name).to.equal('Test Application');
        expect(msg.AlertLevel).to.equal('Critical');
        expect(msg.AlertMessage).to.equal('Hardware failure');
        done();
        });
      });
    });
   // Addition tests go here.
});