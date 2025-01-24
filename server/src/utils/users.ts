import { IUser } from "../types/IRoomType";


const Users: IUser[] = [];

export const getUsers = () => {
    return Users
}

export const addUser = (user: IUser) => {
    Users.push(user)
}
