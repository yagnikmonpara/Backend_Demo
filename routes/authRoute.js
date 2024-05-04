import express from 'express';
import {
  registerUser,
  loginUser,
} from '../controller/authController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
// router.use(requireSignIn);

export default router;