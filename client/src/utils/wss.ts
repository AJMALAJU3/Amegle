import io from 'socket.io-client';
import { UserState } from '../store/slices/userSlice';
import * as webRTCHandler from "./webRTCHandler"
import { SignalData } from 'simple-peer';

const SERVER = 'http://localhost:5002';
let socket: any;
export const connectWithSocketIOServer = () => {
  return new Promise<string>((resolve, reject) => {
    socket = io(SERVER, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log(`Connected to socket.io server with ID: ${socket.id}`);
      resolve(socket.id || '');
    });

    socket.on('conn-prepare', ({ connUserSocketId }: { connUserSocketId: string }) => {
      console.log('Preparing new peer connection...');
      webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

      socket.emit('conn-init', { connUserSocketId });
    });

    socket.on('conn-init', ({ connUserSocketId }: { connUserSocketId: string }) => {
      webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });

    socket.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error);
      reject(error);
    });
  });
};

export const requestSquadMeet = (identity: any) => {
  if (!socket) {
    console.error('Socket not initialized. Cannot create room.');
    return;
  }
  socket.emit('check-availabe-slot', { identity });
};

export const createNewRoom = (user: UserState) => {
  if (!socket) {
    console.error('Socket not initialized. Cannot create room.');
    return;
  }

  console.log('Creating a new room...', user);
  socket.emit('create-new-room', { user });
};

export const joinRoom = (user: any, roomId: string) => {
  if (!socket) {
    console.error('Socket not initialized. Cannot join room.');
    return;
  }

  console.log(`Joining room: ${roomId} with identity: ${user.username}`);
  socket.emit('join-room', { user, roomId });
};


export const signalPeerData = ({ signal, connUserSocketId}:{ signal: SignalData, connUserSocketId: string }) => {
  if (!socket) {
    console.error('Socket not initialized. Cannot send signal data.');
    return;
  }
  const data = {signal, connUserSocketId}
  console.log('Sending signaling data to peer...');
  socket.emit('conn-signal', data);
};
