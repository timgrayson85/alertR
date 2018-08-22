'use strict'

var expect = require('chai').expect
  , server = require('../app')
  , io = require('socket.io-client')
  , ioOptions = { 
      transports: ['websocket']
    , forceNew: true
    , reconnection: false
  }
  , sender
  , receiver


describe('Alerting Events', function(){
  beforeEach(function(done){

    // connect two io clients
    sender = io('http://localhost:3000/', ioOptions)    
    receiver = io('http://localhost:3000/', ioOptions)    
    // finish beforeEach setup
    done()
  })
  afterEach(function(done){
    
    // disconnect io clients after each test
    sender.disconnect()
    receiver.disconnect()
    done()
  })

  describe('Emit Events', function(){
    it('Clients should receive correct message when the `alert-raised` event is emited.', function(done){
      sender.emit('alert-raised', { Name: 'testApp', AlertLevel: 'Critical'})
      receiver.on('alert-raised', function(msg){
        expect(msg.Name).to.equal('testApp')
        expect(msg.AlertLevel).to.equal('Critical')
        done()
        })
      })
    })
  })