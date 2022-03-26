import { io } from "socket.io-client"; // ESM syntax
const socket = io.connect("http://localhost:3000", {
  transports: ['websocket']
}); // set a connection

socket.on("connect", () => {
  // listen to event coming from the server

  displayMessage(`You connected with id ${socket.id}`);
}); // this is not a custom event, it's built in and will excute everytime the socket connects to the server

socket.on("send-to-all", (message) => {
  displayMessage(message);
});
const form = document.getElementById("form");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const joinRoomButton = document.getElementById("room-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;
  // if we dont have a message it will do nothing
  displayMessage(message); // otherwise call this func
  socket.emit("send-message", message, room);

  messageInput.value = "";
}); // activates send button to send messages

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  socket.emit("join-room", room, (message) => {
    // callback func is called from the server to the client so i send the parameter from the server
    displayMessage(message); // message is sent from the server
  });
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;

  document.getElementById("message-container").append(div);
}
