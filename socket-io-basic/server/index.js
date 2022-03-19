const { createServer } = require('http');
const { Server } = require('socket.io');

const app = require('./src/app');

const httpserver = createServer(app);

const io = new Server(httpserver, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

const users = [];

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
    users.filter((user) => user != socket.username);
  });

  socket.on('set username', (username) => {
    socket.username = username;
    users.push(socket.username);
    console.log(users);
  });

  socket.on('hello', (data) => {
    console.log(`client: ${data}`);
    socket.emit('hello', data);
  });

  socket.on('message', (message) => {
    io.emit('message', { message: message, user: socket.username });
  });
});

const PORT = process.env.PORT || 5000;
httpserver.listen(PORT);

httpserver.on('error', (err) => {
  console.log('Error:', err);
});

httpserver.on('listening', () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
