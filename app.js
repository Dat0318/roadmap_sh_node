import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import axios from 'axios';

const port = process.env.PORT || 4001,
  index = require('./routes/index'),
  app = express(),
  server = http.createServer(app),
  io = socketIo(server);

app.use(index);

io.on('connection', (socket) => {
  console.log('New client connected'), setInterval(() => getApiAndEmit(socket), 10000);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const getApiAndEmit = async (socket) => {
  try {
    const res = await axios.get(
      'https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558'
    );
    socket.emit('FromAPI', res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
