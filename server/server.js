const io = require("socket.io")(3000, {
  cors: {
    origin : ['http://']
  }
});

// client and server cannot communicate with eachother becaudse cors is blocking them 
// server on 300 , client on 8080

io.on("connection", (socket) => {
  console.log("connected", socket.id);
});
