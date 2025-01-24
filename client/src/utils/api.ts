import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (username: string, socketId: string) => {
  return await api.post('/register', {
    username,
    socketId,
  });
}

export const getRoomsExists = async () => {
  return await api.get(`/room-exists`)
}

export default api;
