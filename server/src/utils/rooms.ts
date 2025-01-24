import { IRoomData, IUser} from "../types/IRoomType";
import { generateUserId } from "./generateUserId";


const rooms: Record<string, IRoomData> = {};


export const getRooms = () => {
    return rooms
}

export const addNewRoom = (user:IUser) => {
    const roomId = generateUserId();
    rooms[roomId] = {count:1, candidates:[user]}
    return roomId
}

export const addRoom = (user:IUser, roomId: string) => {
    if (rooms[roomId]) {
        rooms[roomId].candidates.push(user)
    }
    return rooms
}