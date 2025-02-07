import { Server } from "socket.io"
import http from 'http'
import express from "express"

const server = http.createServer(express());
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

export default io;

