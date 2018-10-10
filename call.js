var uuid = require('uuid');

//var calls = [];

var calls = {};

function Call() {
  this.id = uuid.v1();
  this.started = Date.now();
  this.peers = [];
}

Call.prototype.toJSON = function() {
  return {id: this.id, started: this.started, peers: this.peers};
};

Call.prototype.addPeer = function(peerId) {
  this.peers.push(peerId);
};

Call.prototype.removePeer = function(peerId) {
  var index = this.peers.lastIndexOf(peerId);
  if (index !== -1) this.peers.splice(index, 1);
};

Call.create = function() {
  var call = new Call();
  //calls.push(call);
  //this is very improper but this function will hopefully not be used in final product
  calls[Math.random()] = call;
  return call;
};

Call.join = function(topic) {
  console.log("joining a study group with the topic of " + topic);
  
  if (topic in calls) {
	return calls[topic];
  } else {
	var call = new Call();
	calls[topic] = call;
    return call;
  }
};

Call.get = function(id) {
  return (Object.values(calls).filter(function(call) {
    return id === call.id;
  }) || [])[0];
};

Call.getAll = function() {
  return Object.values(calls);
};

module.exports = Call;