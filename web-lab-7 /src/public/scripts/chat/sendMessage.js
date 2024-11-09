const messageForm = document.getElementById('message_form');
const messageInput = document.getElementById('message_input');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  send(messageInput);
  messageInput.value = '';
  messageInput.focus();
});

function send(messageInput) {
  const content = messageInput.value;
  const userId = localStorage.getItem('userId');

  console.log(content, userId);
  const message = { content, userId };
  chatSocket.emit('msgToServer', message);
  messageInput.value = '';
  messageInput.focus();
}

chatSocket.on('connect', () => {
  console.log('socket connected');
});

chatSocket.on('disconnect', () => {
  console.log('socket disconnected');
});
