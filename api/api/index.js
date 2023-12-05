const express = require("express");
const cookisParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userModel } = require("../models/userModel");
const { router } = require("../routes/conversationRoute");
const { messageRouter } = require("../routes/messagesRoute");
const { getUserRouter } = require("../routes/getUserRoute");

// connect with database
require("../config/db");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookisParser());

app.get("/", (req, res) => {
  res.json("Hello world");
});

// Register user
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, salt);

    await userModel.collection.insertOne({
      username,
      password: hashedPassword,
    });

    const createdUser = (await userModel.find({ username: username }))[0];

    jwt.sign(
      { userId: createdUser._id, username: createdUser.username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) {
          console.log("Error in jwt signing", err);
        } else {
          res
            .cookie("token", token, { secure: true, sameSite: "none" })
            .status(201)
            .json({
              userId: createdUser._id.toString(),
              username: createdUser.username,
            });
        }
      }
    );
  } catch (error) {
    console.log(`Error encountered at register route: ${error}`);
  }
});

// login user
app.use("/login", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await userModel
    .findOne({ username: username })
    .then((user) => user);

  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, username: foundUser.username },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { secure: true, sameSite: "none" }).json({
            id: foundUser._id,
          });
        }
      );
    }
  }
});

// REGSITER SOCKET
// app.get("/chat", (req, res) => {
//   const io = new Server(server, {
//     cookie: true,
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
//   });

//   // ESTABLISHING CONNECTION
//   io.on("connection", async (socket) => {
//     const token = req.cookies.token;
//     let list = [];

//     if (token) {
//       jwt.verify(token, jwtSecret, {}, (err, userData) => {
//         if (err) throw err;
//         const { userId, username } = userData;
//         socket.userId = userId;
//         socket.username = username;
//       });
//     }

//     // const sockets = await io.sockets.fetchSockets();
//     // sockets.forEach((sck) => console.log(sck.username));

//     list.push(io.sockets.sockets.username);
//     //console.log(list);
//   });

//   io.on("disconnect", (socket) => {
//     // Remove disconnected client from the data structure
//     delete connectedClients[socket.id];

//     // Your other disconnection logic...
//   });
//   res.json({ data: "hello world" });
// });

// get user data
app.get("/profile", (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.use("/api/conversation", router);
app.use("/api/messages", messageRouter);
app.use("/api/users", getUserRouter);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
