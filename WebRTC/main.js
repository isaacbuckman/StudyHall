var video = document.getElementById('remote-video');
var remoteStream;

navigator.mediaDevices.getUserMedia({audio: true, video: true})
.then(function(stream) {
  window.localStream = stream
})
.catch(function(err) {
  console.log(err);
});

var peer = new Peer();

peer.on('open', function(id) {
	document.getElementById('my-id').innerHTML = id;
	console.log('My peer ID is: ' + id);
});

//incoming
peer.on('call', function(call){
	call.answer(window.localStream);
	display(call);
});

//outgoing
function begin(callID) {
	var call = peer.call(callID, window.localStream);
	display(call);
}

function display(call) {
	call.on('stream', function(stream){
		
		console.log("Someone is wanting me to add a stream");
	
		//var video = document.querySelector('#remote-video');
		remoteStream = stream;
		video.srcObject = stream;
		video.play();
	});
}