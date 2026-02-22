import express from 'express';
import {
    getEsportsProfile,
    createEsportsProfile,
    getGamers,
    getGamerById
} from '../controllers/esports/esportsController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile Routes
router.get('/profile/me', isAuthenticated, getEsportsProfile);
router.post('/profile', isAuthenticated, createEsportsProfile);

// Public Routes
router.get('/gamers', getGamers);
router.get('/gamers/:id', getGamerById);

export default router;
