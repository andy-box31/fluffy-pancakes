const socketio = require('socket.io')

module.exports = function socketIo(server) {
  const io = socketio(server, {
    pingTimeout: 60000
  })

  io.on('connection', (socket) => {
    socket.broadcast.emit('chat message', `New user entered: ${socket.id}`)
    //console.log('a user connected', socket.id)

    socket.on('disconnect', () => {
      //console.log('user disconnected', socket.id)
    });
      
    socket.on('chat message', (msg) => {
      io.emit('chat message', `${socket.id}: ${msg}`)
    });
  });
}
