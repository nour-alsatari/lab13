import { io } from 'socket.io-client'; // ESM syntax
const socket = io("http://localhost:3000")


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

  messageInput.value = "";
}); // activates send button to send messages

joinRoomButton.addEventListener('click', ()=>{
    const room = roomInput.value;
})

function displayMessage(message){
    const div = document.createElement("div");
    div.textContent = message;

    document.getElementById('message-container').append(div)
}
