import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
    socketId: string | null;
}

const initialState: SocketState = {
    socketId: null,
};

const socketSlice = createSlice({
    name: 'socketId',
    initialState,
    reducers: {
        setSocketId: (state, action: PayloadAction<string>) => {
            state.socketId = action.payload;
        },
        clearSocketId: (state) => {
            state.socketId = null;
        },
    },
});

export const { setSocketId, clearSocketId } = socketSlice.actions;
export default socketSlice.reducer;
