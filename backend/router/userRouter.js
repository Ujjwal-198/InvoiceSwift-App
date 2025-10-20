import express from 'express';
import { handleSignup, handleLogin, handleLogout, handleCheckAuth, handleDeleteUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.get('/auth/me', handleCheckAuth);
router.delete('/deleteUser', authMiddleware, handleDeleteUser);

export default router;