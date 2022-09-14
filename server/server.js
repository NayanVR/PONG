import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

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


io.on("connection", client => {
  
});

httpServer.listen(port);