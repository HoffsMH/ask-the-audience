/* jshint browser: true*/
var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});


var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', bindbutton);
}

function bindbutton() {
  socket.send('voteCast', this.innerText);
}

socket.on('voteCount', function (votes) {
  var voteCounts = document.querySelectorAll('.votecount.'+voteCategory);
  var element;
  
  for (var voteCategory in votes) {
    element = document.querySelector('.votecount.'+voteCategory);
    element.innerText = voteCategory + ": " + votes[voteCategory];
  }
});
