const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");

PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer);

app.param("mode", (req, res, next, mode) => {
  if (mode == "default" || mode == "buttons") {
    next();
  } else {
    res.redirect("/game/" + req.params.uuid);
  }
});

app.use("/game/:uuid/:mode", (req, res) => {
  res.render("game", { gameID: req.params.uuid, mode: req.params.mode });
});

app.use("/game/:uuid/", (req, res) => {
  res.render("game", { gameID: req.params.uuid });
});

app.use("/game", (_, res) => {
  const gameID = uuidv4();
  res.redirect("/game/" + gameID);
});

app.use("/", (_, res) => {
  res.render("index");
});

// Socket server
io.on("connection", (socket) => {
  socket.on("getGameStatus", (gameID) => {
    socket.join(gameID);
    socket.to(gameID).emit("getGameStatus");
  });

  socket.on("setGameStatus", (gameID, data) => {
    socket.to(gameID).emit("setGameStatus", data);
  });

  socket.on("updateStatus", (gameID, command, data) => {
    socket.to(gameID).emit("updateStatus", command, data);
  });
});

httpServer.listen(PORT);
