import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import axios from 'axios';
import router from './routes/index.js';

const port = process.env.PORT || 4001,
  app = express(),
  server = http.createServer(app),
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(router);

io.on('connection', (socket) => {
  console.log('New client connected'), setInterval(() => getApiAndEmit(socket), 10000);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const getApiAndEmit = async (socket) => {
  try {
    // const res = await axios.get('https://weatherkit.apple.com/api/v1/weather/43.7695/11.2558', {
    //     headers: {
    //         Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJERUYxMjNHSElKIiwiaWF0IjoxNDM3MTc5MDM2LCJleHAiOjE0OTMyOTgxMDAsInN1YiI6ImNvbS5leGFtcGxlLndlYXRoZXJraXQtY2xpZW50In0.NaQR2u56JnTr7-RtnKK9niaswg3JJmgqbcD2hEQQm3U'
    //     }
    // });
    const res = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=43.7695&lon=11.2558&appid=55ed72188bbec37b5541b85e237d9a1e'
    );
    socket.emit('FromAPI', res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code} ${error.message}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
