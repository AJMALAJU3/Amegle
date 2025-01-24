export interface IRoomData {
    count: number,
    candidates: IConnectedUser[]
}

export interface IConnectedUser {
    username: string, 
    userId: string,
    socketId: string,
}

export interface IUser {
    username: string, 
    userId: string
    socketId: string,
}