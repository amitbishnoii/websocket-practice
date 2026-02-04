import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from 'cors';

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("hello world");
});

io.on("connection", (socket) => {
    console.log('user connected!', socket.id);

    socket.on("message", (data) => {
        console.log(data);
        io.emit("recieve-message", data);
    });

    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`);
    });
});

server.listen(port, () => {
    console.log(`app listening on port ${port}`);
});