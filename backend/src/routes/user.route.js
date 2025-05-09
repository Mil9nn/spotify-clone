import express from 'express'

import { getAllUsers, getMessages } from '../controllers/user.controler.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, getAllUsers);
router.get('/messages/:userId', getMessages);

export default router;