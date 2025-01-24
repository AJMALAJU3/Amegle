import express from 'express';
import { existingRoom, registerUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.get('/room-exists', existingRoom);

export default router;
