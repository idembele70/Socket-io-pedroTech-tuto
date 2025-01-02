import express from 'express';
import { createServer } from 'http';
import {Server} from 'socket.io';
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  res.render('home');
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log('Server is running on port %d', port);
});

io.on('connection', (socket) => {
  console.log("User connected: ", socket.id);

  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});