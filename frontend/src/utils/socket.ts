import { io } from "socket.io-client";

const socket = io("ws://localhost:3000", {
    withCredentials: true, // If using cookies for auth
});

socket.connect();

socket.on("connect", () => {
    console.log(`✅ Connected to server: ${socket.id}`);
});

socket.on("connect_error", (err) => {
    console.error(`❌ Connection error: ${err.message}`);
});


export default socket;