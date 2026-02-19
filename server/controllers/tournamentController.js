import Tournament from "../models/Tournament.js";
import EsportsProfile from "../models/EsportsProfile.js";
import User from "../models/userModel.js";

// @desc    Create a new tournament
// @route   POST /api/tournaments
// @access  Private
export const createTournament = async (req, res) => {
    try {
        const { name, gameTitle, startDate, description, entryFee, bracketType, maxParticipants, teamSize, region, platform } = req.body;

        // Check if user has an Esports Profile
        const profile = await EsportsProfile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: "You must set up your Esports Profile before hosting a tournament.",
            });
        }

        const tournament = await Tournament.create({
            name,
            gameTitle,
            startDate,
            description,
            entryFee,
            bracketType,
            maxParticipants,
            teamSize,
            region,
            platform,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            data: tournament,
        });
    } catch (error) {
        console.error("Error creating tournament:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// @desc    Get all tournaments
// @route   GET /api/tournaments
// @access  Public
export const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().sort({ startDate: 1 }); // Sort by soonest
        res.status(200).json({
            success: true,
            count: tournaments.length,
            data: tournaments,
        });
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// @desc    Get single tournament
// @route   GET /api/tournaments/:id
// @access  Public
export const getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id)
            .populate("createdBy", "name username avatar")
            .populate("participants.user", "name username avatar");

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        res.status(200).json({
            success: true,
            data: tournament,
        });
    } catch (error) {
        console.error("Error fetching tournament:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// @desc    Join a tournament
// @route   POST /api/tournaments/:id/join
// @access  Private
export const joinTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: "Tournament not found",
            });
        }

        // Check if user has an Esports Profile
        const profile = await EsportsProfile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: "You must have an Esports Profile to join tournaments.",
            });
        }

        // Check if already joined
        const isParticipant = tournament.participants.some(
            (p) => p.user.toString() === req.user._id.toString()
        );

        if (isParticipant) {
            return res.status(400).json({
                success: false,
                message: "You are already registered for this tournament.",
            });
        }

        // Check max participants
        if (tournament.participants.length >= tournament.maxParticipants) {
            return res.status(400).json({
                success: false,
                message: "Tournament is full."
            });
        }

        tournament.participants.push({
            user: req.user._id,
            esportsProfile: profile._id,
            status: "registered",
        });

        await tournament.save();

        res.status(200).json({
            success: true,
            message: "Successfully joined tournament",
            data: tournament,
        });
    } catch (error) {
        console.error("Error joining tournament:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
