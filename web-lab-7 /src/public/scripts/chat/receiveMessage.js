const messages = document.getElementById('messages');
const chatSocket = io('');

async function getOldMessages() {
  try {
    const baseUrl = 'https://web-6.onrender.com';
    const url = `${baseUrl}/api/message`;

    const response = await fetch(url, {
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      data.forEach((message) => {
        receiveMessage(message);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

getOldMessages();

chatSocket.on('connect', () => {
  console.log('socket connected');
});

chatSocket.on('disconnect', () => {
  console.log('socket disconnected');
});

chatSocket.on('msgToClient', (message) => {
  console.log('received:', message);
  receiveMessage(message);
});

function receiveMessage(message) {
  messages.insertBefore(createMessage(message), messages.firstChild);
}

function createMessage(message) {
  const message_div = document.createElement('div');
  message_div.className = 'message';

  const createdAt = document.createElement('div');
  createdAt.className = 'createdAt';
  createdAt.innerHTML = message.createAt;

  const content = document.createElement('div');
  content.className = 'content_message';
  content.innerHTML = message.content;

  message_div.appendChild(createdAt);

  if (message.user) {
    const username = document.createElement('div');
    username.className = 'username_message';
    username.innerHTML = message.user.email;
    message_div.appendChild(username);
  } else {
    const username = document.createElement('div');
    username.className = 'username_message';
    username.innerHTML = 'Anonymous';
    message_div.appendChild(username);
  }

  message_div.appendChild(content);
  return message_div;
}
