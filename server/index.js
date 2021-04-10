const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);
  console.log(socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('Call Ended');
  });

  socket.on('callUser', ({
    userToCall, signalData, from, name,
  }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });

    socket.on('answerCall', (data) => {
      io.to(data.to).emit('Call Accepted', data.signal);
    });
  });
});

const PORT = 3000;
const path = require('path');
const router = require('./router');

app.use(morgan('dev')).use(cors()).use(express.json());
app.use('/app', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
server.listen(5000, () => console.log('listening on port 5000'));
