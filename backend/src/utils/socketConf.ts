import { Server } from "socket.io"
import server from "../server";

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",  // Change to your frontend URL
        methods: ["GET", "POST"],
        credentials: true // Allow cookies & authentication
    }
});

io.on("connection", (socket) => {
    console.log(`⚡ New client connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log(`📩 Message received: ${data}`);
        io.emit("message", data); // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});

export default io;

