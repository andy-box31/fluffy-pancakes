const http = require('http')
const socketio = require('socket.io')


module.exports = function socketIo(app) {
  const server = http.createServer(app);
  const io = socketio(server)

  io.on('connection', function(socket){
    socket.broadcast.emit('chat message', `New user entered: ${socket.id}`);
    console.log('a user connected', socket.id);

    socket.on('disconnect', function(){
      console.log('user disconnected', socket.id);
    });
      
    socket.on('chat message', function(msg){
      io.emit('chat message', `${socket.id}: ${msg}`);
    });
  });

  server.listen(4000, function(){
    console.log(`socket.io listening on port 4000!`)
  });
}
