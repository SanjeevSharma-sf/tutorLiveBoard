const express = require("express");
const socket = require("socket.io");

const app = express(); // initialize and server ready
app.use(express.static("public")); //ye kya karega ki ye public folder mein jake index.html folder ko khol dega
const port = process.env.PORT || 5000;
let server = app.listen(port, () => {
  console.log("Listening to port " + port); // koi request karega to yahan request listen hogi
});
let io = socket(server); //initialization
io.on("connection", (socket) => {
  console.log("Made socket connection");
  // Received data
  socket.on("beginPath", (data) => {
    // data -> data from frontend
    // Now transfer data to all connected computers
    io.sockets.emit("beginPath", data);
  });
  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });
  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });
});

