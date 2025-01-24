import { Request, Response } from 'express';
import { generateUserId } from '../utils/generateUserId';
import { addUser } from '../utils/users';
import { getRooms } from '../utils/rooms';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('called register', req.body)
        const { username, socketId } = req.body;

        if (!username || !socketId) {
            res.status(400).json({ error: 'Username and Socket ID are required' });
            return;
        }
        const userId = generateUserId();

        addUser({ username, socketId, userId })

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { username, socketId, userId },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const existingRoom = async (req: Request, res: Response) => {
    const existingRooms = getRooms()
    let freeRoomId = null
    for (const room in existingRooms) {
        if (existingRooms[room].count < 4) {
            freeRoomId = room
            break
        } 
    }
    if (freeRoomId) {
        res.send({ roomExists: true, roomId: freeRoomId });
    } else {
        res.send({ roomExists: false, roomId: null });
    }
}