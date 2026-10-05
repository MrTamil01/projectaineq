import { Server } from "socket.io";

let ioInstance = null;

export const initSocket = (server) => {
  ioInstance = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  ioInstance.on("connection", (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    socket.on("joinSession", (sessionId) => {
      socket.join(sessionId);
      console.log(`[Socket.IO] Client ${socket.id} joined session channel: ${sessionId}`);
    });

    socket.on("disconnect", () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  return ioInstance;
};

export const emitSocketEvent = (eventName, data, room = null) => {
  if (!ioInstance) return;
  if (room) {
    ioInstance.to(room).emit(eventName, data);
  } else {
    ioInstance.emit(eventName, data);
  }
};
