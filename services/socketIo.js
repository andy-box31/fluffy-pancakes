const socketio = require('socket.io')

module.exports = function socketIo(server) {
  const io = socketio(server, {
    pingTimeout: 60000
  })

  io.on('connection', (socket) => {
    socket.broadcast.emit('welcome message', 'Trump', `New user entered: ${socket.id}`)
    //console.log('a user connected', socket.id)

    socket.on('disconnect', () => {
      //console.log('user disconnected', socket.id)
    });
      
    socket.on('chat message', (...rest) => {
      io.emit('chat message', ...rest)
    });
    socket.on('welcome message', (name) => {
      io.emit('welcome message', 'Trump', `${socket.id} is ${name}. Welcome to chat ${name}`)
    });
  });
}
