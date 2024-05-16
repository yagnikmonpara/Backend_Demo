import express from 'express';
import { createAdmin, removeAdmin } from '../controller/adminController.js';
import { requireSignIn, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create admin route
router.post('/',   createAdmin);

// Remove admin route
router.delete('/:userId', requireSignIn, requireAdmin, removeAdmin);

export default router;