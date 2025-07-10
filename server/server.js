const express = require("express");
const http = require("http");
const cors = require("cors");
const { userJoin, getUsers, userLeave } = require("./utils/user");

const app = express();
const server = http.createServer(app);

// ✅ Proper Socket.IO CORS setup
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: "*", // 🔁 change to Netlify URL later
    methods: ["GET", "POST"],
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server running 🎉" });
});

// socket.io logic
let imageUrl, userRoom;

io.on("connection", (socket) => {
  socket.on("user-joined", (data) => {
    const { roomId, userId, userName, host, presenter } = data;
    userRoom = roomId;
    const user = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);

    socket.emit("message", {
      message: "Welcome to ChatRoom",
    });

    socket.broadcast.to(user.room).emit("message", {
      message: `${user.username} has joined`,
    });

    io.to(user.room).emit("users", roomUsers);
    io.to(user.room).emit("canvasImage", imageUrl);
  });

  socket.on("drawing", (data) => {
    imageUrl = data;
    socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
  });

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
    }
  });
});

const PORT = process.env.PORT || 5002;

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
