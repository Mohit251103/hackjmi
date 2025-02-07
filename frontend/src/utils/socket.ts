import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    transports: ["websocket"], // Ensures WebSocket is used
    withCredentials: true // If using cookies for auth
});

export default socket;