const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  credentials: true,
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (sckId) => {
  users = users.filter((user) => user.socketId !== sckId);
};

io.on("connection", (socket) => {
  console.log("A user conected");
  io.emit("welcome", "hello from socket");

  socket.on("addUser", (userId) => {
    // take socket and userid from client
    addUser(userId, socket.id);

    io.emit("getUser", users);
  });

  // send message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("in sendMessage socekt backend");
    const user = users.find((user) => user.userId === receiverId);
    console.log(user);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a client disconnected");
    removeUser(socket.id);
    io.emit("getUser", users);
  });
});

server.listen(8900, () => console.log("Socket server listening on 8900"));
