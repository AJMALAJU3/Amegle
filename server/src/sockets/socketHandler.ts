import { DefaultEventsMap, Socket, Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { addNewRoom, addRoom } from '../utils/rooms';
import { IUser } from '../types/IRoomType';

let io: SocketIOServer;

export const initializeSocket = (server: http.Server): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('create-new-room', (data) => createNewRoomHandler(data, socket));
    socket.on('join-room', (data) => joinRoomHandler(data, socket));
    socket.on('conn-init', (data) => initializeConnectionHandler(data, socket));

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};


const createNewRoomHandler = (data:{user: IUser}, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  console.log('Creating new room:', data.user);

  const roomId = addNewRoom(data.user)
  console.log(roomId,'roomid')
  socket.join(roomId);
};

const joinRoomHandler = (data: any, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const rooms = addRoom(data.user, data.roomId)
  console.log('User joined room:', data.roomId);
  socket.join(data.roomId);
  rooms[data.roomId].candidates.forEach((user: IUser) => {
    if (user.socketId !== socket.id) {
      console.log(user.socketId,'callled conn- prepare')
      io.to(user.socketId).emit('conn-prepare', { connUserSocketId: socket.id });
  }
  });
}

const initializeConnectionHandler = (data:any, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  console.log('conn init for :',data)
  io.to(data.connUserSocketId).emit('conn-init', { connUserSocketId: socket.id });
};


