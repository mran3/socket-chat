let express = require('express');
let app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.use(express.static(__dirname));

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('msg', function(msg){
      // io.emit('msg', msg);
      socket.broadcast.emit('msg', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});