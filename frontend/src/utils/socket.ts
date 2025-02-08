import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true, // If using cookies for auth
});

socket.on("connect", () => {
    console.log(`✅ Connected to server: ${socket.id}`);
});

socket.on("connect_error", (err) => {
    console.error(`❌ Connection error: ${err.message}`);
});


export default socket;