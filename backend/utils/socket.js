const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const userSocketMap = {}; //? used to store online users ex: {userId: socketId}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  //! connection
  console.log("a user connected 👍 ", socket.id);
  const userId = socket.handshake.query.userId; //* get userId from query params
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("onLineUsers", Object.keys(userSocketMap)); //* emit online users

  socket.on("disconnect", () => {
    //? disconnection
    console.log("a user disconnected 👎 ", socket.id);
    delete userSocketMap[userId];
    io.emit("onLineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server };
