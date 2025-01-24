import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';

let io: SocketIOServer;

export const setupSocket = (server: http.Server) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('create-new-room', (data) => createNewRoomHandler(data, socket));
  });
};
