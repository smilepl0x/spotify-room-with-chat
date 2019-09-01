// Make connection
var socket = io();

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var c_window = document.getElementById('chat_window');

// Use enter key to Send
message.addEventListener('keyup', function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('send').click();
  }
});

// Keep scrollbar at bottom
function scrollToBottom(){
  c_window.scrollTop = c_window.scrollHeight - c_window.clientHeight;
}

// Emit events
btn.addEventListener('click', function(){
  if (message.value != '') {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
  }
  message.value = '';
});

// Listen for Events
socket.on('chat', function(data){
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  scrollToBottom();
});
