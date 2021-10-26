const express = require('express');
const app = express();
const http = require('http').createServer(app);
const chatSocket = require('./src/sockets/chat');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.static(__dirname + '/public'));

chatSocket(io);

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});