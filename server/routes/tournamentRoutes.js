import express from "express";
import {
    createTournament,
    getTournaments,
    getTournament,
    joinTournament,
} from "../controllers/tournamentController.js";
import { isAuthenticated as auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET / - Get all tournaments
// POST / - Create a new tournament (protected)
router.route("/")
    .get(getTournaments)
    .post(auth, createTournament);

// GET /:id - Get a specific tournament
router.route("/:id")
    .get(getTournament);

// POST /:id/join - Join a tournament (protected)
router.route("/:id/join")
    .post(auth, joinTournament);

export default router;
