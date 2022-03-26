const {instrument} = require ('@socket.io/admin-ui')
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"] // the client in snowpack
  },
});

// client and server cannot communicate with eachother becaudse cors is blocking them
// server on 300 , client on 8080

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("send-message", (message, room) => {
    // message recieved by server from the client
    console.log(message, room);
    if (room == "") {
      socket.broadcast.emit("send-to-all", message); // server sending the message to ALL clients, every socket
    } else {
      socket.to(room).emit("send-to-all", message);
    }

    // io.emit sends the event to all clients inclusing the client who sent the event
    // socket.broadcast.emit send to all the clients except the client who sent the event
    // from the current socket we broadcast a message to every other one that isn't me
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`joined ${room}`)
  });
});

instrument(io, {auth:false})
