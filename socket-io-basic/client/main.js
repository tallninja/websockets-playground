const socket = io('http://localhost:5000/');

const chatInput = document.querySelector('#chatbox');
const sendButton = document.querySelector('#send-button');
const chats = document.querySelector('#chats');

const usernames = ['nick', 'corey', 'desmond', 'jack', 'jim', 'bob'];

sendButton.onclick = () => {
	const message = chatInput.value;
	socket.emit('message', message);
};

const field = document.querySelector('#field');
const user1 = document.querySelector('#user1');

field.addEventListener('mousemove', (e) => {
	const position = {
		x: e.clientX,
		y: e.clientY,
	};
	user1.style.left = position.x + 'px';
	user1.style.top = position.y + 'px';
	// console.log(position);
	socket.emit('cursorMove', position);
});

socket.on('connect', () => {
	if (socket.connected) {
		console.log('Connected to server !');
		socket.emit(
			'set username',
			usernames[Math.floor(Math.random() * usernames.length)]
		);
	} else {
		console.log('Failed to connect to server !');
	}
});

socket.on('disconnect', () => {
	if (socket.disconnected) {
		console.log('Disconnected from server !');
	} else {
		console.log('Failed to disconnect from server !');
	}
});

socket.on('message', (data) => {
	console.log(`${data.user}: ${data.message}`);
	const chat = document.createElement('li');
	chat.innerText = `${data.user}: ${data.message}`;
	chats.appendChild(chat);
});

socket.on('cursorMove', (position) => {
	console.log(position);
	user1.style.left = position.x + 'px';
	user1.style.top = position.y + 'px';
});
