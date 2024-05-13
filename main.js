import {createRoom, requireAuth} from "./scripts/firebase";
import "./style.css";

function setupEventListener() {
    const createRoomBtn = document.getElementById("create-room-btn");
    createRoomBtn.addEventListener("click", async() => {
     const roomId= await createRoom();
     window.location.href = `room.html?roomId=${roomId}`
    });
}

requireAuth().then(setupEventListener)
