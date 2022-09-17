import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initGame, gameLoop } from "./game.js";

const FRAME_RATE = 60;

const app = express();
const port = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

const state = {};
const clientRooms = {};

io.on("connection", client => {

  client.on('updatePaddle', handleUpdatePaddle);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);

  function handleJoinGame(roomName) {
    const room = io.sockets.adapter.rooms.get(roomName);

    let numClients = room.size;

    if (numClients === 0) {
      client.emit('unknownCode');
      return;
    } else if (numClients > 1) {
      client.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = roomName;

    client.join(roomName);
    client.number = 2;
    client.emit('roomJoined', 2);

    startGameInterval(roomName);
  }

  function handleNewGame() {
    const roomName = makeid(5);
    clientRooms[client.id] = roomName;
    console.log("Room Created :", roomName);

    state[roomName] = initGame();

    client.join(roomName);
    client.number = 1;
    client.emit('roomCreated', roomName, 1);
  }

  function handleUpdatePaddle(yPos) {
    const roomName = clientRooms[client.id];
    if (!roomName) return;

    state[roomName].players[client.number - 1].y = yPos;
  }
});


function startGameInterval(roomName) {
  const interval = setInterval(() => {

    const winner = gameLoop(state[roomName]);

    if (!winner) {
      emitGameState(roomName, state[roomName]);
    } else {
      // emitGameOver(roomName, winner);
      console.log("Winner : ", winner);
      clearInterval(interval);
    }
  }, 1000 / FRAME_RATE);
}

function emitGameState(room, state) {
  io.sockets.in(room).emit('gameState', JSON.stringify(state));
}



function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

httpServer.listen(port);