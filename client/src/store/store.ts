import { configureStore } from '@reduxjs/toolkit';
import socketReducer from './slices/socketSlice'
import loadingReducer from './slices/loadingSlice'
import roomReducer from './slices/roomSlice';
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        socket: socketReducer,
        loading: loadingReducer,
        room: roomReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
