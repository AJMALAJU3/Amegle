import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    username: string;
    socketId: string;
    userId: string;
}

const initialState: UserState = {
    username: '',
    socketId: '',
    userId: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username;
            state.socketId = action.payload.socketId;
            state.userId = action.payload.userId;
        },
        clearUser: (state) => {
            state.username = '';
            state.socketId = '';
            state.userId = '';
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
