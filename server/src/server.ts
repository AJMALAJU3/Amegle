import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute';
import { initializeSocket } from './sockets/socketHandler';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
initializeSocket(server);

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
