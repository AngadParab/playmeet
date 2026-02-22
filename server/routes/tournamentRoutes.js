import express from "express";
import {
    createTournament,
    getTournaments,
    getTournament,
    joinTournament,
    updateTournament,
    deleteTournament,
    kickParticipant,
    updateTournamentStatus,
    getTournamentCredentials,
    updateTournamentCredentials
} from "../controllers/tournamentController.js";
import { isAuthenticated as auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET / - Get all tournaments
// POST / - Create a new tournament (protected)
router.route("/")
    .get(getTournaments)
    .post(auth, createTournament);

// GET /:id - Get a specific tournament
// PUT /:id - Update tournament details (protected)
// DELETE /:id - Delete tournament (protected)
router.route("/:id")
    .get(getTournament)
    .put(auth, updateTournament)
    .delete(auth, deleteTournament);

// POST /:id/join - Join a tournament (protected)
router.route("/:id/join")
    .post(auth, joinTournament);

// POST /:id/participants/:userId/kick - Kick participant (protected)
router.route("/:id/participants/:userId/kick")
    .post(auth, kickParticipant);

// PUT /:id/status - Update tournament status (protected)
router.route("/:id/status")
    .put(auth, updateTournamentStatus);

// GET /:id/credentials - Get room credentials (protected)
// PUT /:id/credentials - Update room credentials (protected)
router.route("/:id/credentials")
    .get(auth, getTournamentCredentials)
    .put(auth, updateTournamentCredentials);

export default router;
