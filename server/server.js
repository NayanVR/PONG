import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initGame, gameLoop, resetGame } from "./game.js";
import { FRAME_RATE } from "./constants.js";
import { makeid } from "./utils.js";

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
const gameInfo = {};
const clientRooms = {};
const gameIntervals = {};

io.on("connection", client => {

  client.on('updatePaddle', handleUpdatePaddle);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
  client.on('getGameInfo', handleGetGameInfo);
  client.on('disconnect', handleDisconnect);

  function handleJoinGame(username, roomName) {
    const room = io.sockets.adapter.rooms.get(roomName);

    let numClients = 0;
    if (room) numClients = room.size;

    if (numClients === 0) {
      client.emit('roomNotFound');
      return;
    } else if (numClients > 1) {
      client.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = roomName;
    gameInfo[roomName].usernames[1] = username;

    client.join(roomName);
    client.number = 2;
    client.emit('roomJoined', 2);

    startGameInterval(roomName);
  }

  function handleNewGame(username) {
    const roomName = makeid(5);
    clientRooms[client.id] = roomName;
    console.log("Room Created :", roomName);

    state[roomName] = initGame();
    gameInfo[roomName] = {
      usernames: [username, `Room code : ${roomName}`],
      score: [0, 0]
    };

    client.join(roomName);
    client.number = 1;
    client.emit('roomCreated', roomName, 1);
  }

  function handleDisconnect() {
    const roomName = clientRooms[client.id];

    if (client.number === undefined) return;

    const clientNumber = client.number;

    if (clientNumber === 2) {
      const clientOneName = gameInfo[roomName].usernames[0];
      const clientTwoName = gameInfo[roomName].usernames[1];
      io.sockets.in(roomName).emit('playerLeft', clientTwoName);
      clearInterval(gameIntervals[roomName]);
      resetGame(state[roomName]);
      gameInfo[roomName] = {
        usernames: [clientOneName, `Room code : ${roomName}`],
        score: [0, 0]
      };
      io.sockets.in(roomName).emit('gameInfo', gameInfo[roomName]);
    }

    if (clientNumber === 1) {
      io.sockets.in(roomName).emit('hostLeft');
      delete clientRooms[client.id];
      delete state[roomName];
      delete gameInfo[roomName];
    }

    console.log(state);
  }

  function handleUpdatePaddle(yPos) {
    const roomName = clientRooms[client.id];
    if (!roomName) return;

    state[roomName].players[client.number - 1].y = yPos;
  }

  function handleGetGameInfo() {
    const roomName = clientRooms[client.id];
    io.sockets.in(roomName).emit('gameInfo', gameInfo[roomName]);
  }
});


function startGameInterval(roomName) {
  gameIntervals[roomName] = setInterval(() => {

    const winner = gameLoop(state[roomName]);

    if (!winner) {
      emitGameState(roomName, state[roomName]);
    } else {
      gameInfo[roomName].score[winner - 1] += 1;
      io.sockets.in(roomName).emit('gameInfo', gameInfo[roomName]);
      resetGame(state[roomName]);
      if (gameInfo[roomName].score[winner - 1] === 10) {
        console.log("Winner : ", winner);
        clearInterval(gameIntervals[roomName]);
      }
    }
  }, 1000 / FRAME_RATE);
}

function emitGameState(room, state) {
  io.sockets.in(room).emit('gameState', JSON.stringify(state));
}


httpServer.listen(port);