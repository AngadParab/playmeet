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

// @desc    Update tournament details
// @route   PUT /api/tournaments/:id
// @access  Private (Creator only)
export const updateTournament = async (req, res) => {
    try {
        let tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        // Check ownership
        if (tournament.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this tournament" });
        }

        const { name, gameTitle, startDate, description, entryFee, bracketType, maxParticipants, teamSize, region, platform } = req.body;

        tournament = await Tournament.findByIdAndUpdate(
            req.params.id,
            { name, gameTitle, startDate, description, entryFee, bracketType, maxParticipants, teamSize, region, platform },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: tournament });
    } catch (error) {
        console.error("Error updating tournament:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// @desc    Delete/Cancel tournament
// @route   DELETE /api/tournaments/:id
// @access  Private (Creator only)
export const deleteTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        // Check ownership
        if (tournament.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this tournament" });
        }

        await tournament.deleteOne();

        res.status(200).json({ success: true, message: "Tournament cancelled successfully" });
    } catch (error) {
        console.error("Error deleting tournament:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// @desc    Kick a participant from the tournament
// @route   POST /api/tournaments/:id/participants/:userId/kick
// @access  Private (Creator only)
export const kickParticipant = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        // Check ownership
        if (tournament.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to manage participants" });
        }

        const participantIndex = tournament.participants.findIndex(
            p => p.user.toString() === req.params.userId
        );

        if (participantIndex === -1) {
            return res.status(404).json({ success: false, message: "Participant not found in tournament" });
        }

        tournament.participants.splice(participantIndex, 1);
        await tournament.save();

        res.status(200).json({ success: true, message: "Participant removed successfully", data: tournament });
    } catch (error) {
        console.error("Error kicking participant:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// @desc    Update tournament status
// @route   PUT /api/tournaments/:id/status
// @access  Private (Creator only)
export const updateTournamentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        let tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        // Check ownership
        if (tournament.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update status" });
        }

        const validStatuses = ["Registration Open", "Registration Closed", "Ongoing", "Completed", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        tournament.status = status;
        await tournament.save();

        res.status(200).json({ success: true, message: `Tournament status updated to ${status}`, data: tournament });
    } catch (error) {
        console.error("Error updating tournament status:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// @desc    Get tournament room credentials
// @route   GET /api/tournaments/:id/credentials
// @access  Private (Participants & Creator)
export const getTournamentCredentials = async (req, res) => {
    try {
        // Need to explicitly select the credentials fields
        const tournament = await Tournament.findById(req.params.id).select('+credentials.roomId +credentials.password +credentials.isPrivate');

        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        const currentUserId = req.user._id.toString();
        const isCreator = tournament.createdBy.toString() === currentUserId;

        // Check if participant
        const isParticipant = tournament.participants.some(p => {
            const participantId = typeof p.user === 'object' ? p.user._id : p.user;
            if (participantId?.toString() === currentUserId) return true;

            // Check team members
            return p.teamMembers?.some(member => {
                const memberId = typeof member.user === 'object' ? member.user._id : member.user;
                return memberId?.toString() === currentUserId;
            });
        });

        if (isCreator) {
            return res.status(200).json({ success: true, data: tournament.credentials });
        }

        if (isParticipant) {
            // Check visibility logic
            const timeDiff = new Date(tournament.startDate) - new Date();
            const MINUTES_5 = 5 * 60 * 1000;

            if (tournament.credentials?.isPrivate === false) {
                return res.status(200).json({ success: true, data: tournament.credentials });
            }

            if (timeDiff <= MINUTES_5 || tournament.status === 'Ongoing') {
                return res.status(200).json({ success: true, data: tournament.credentials });
            }

            return res.status(403).json({
                success: false,
                message: "Credentials are not visible yet. They will be revealed 5 minutes before the start time."
            });
        }

        return res.status(403).json({ success: false, message: "Not authorized to view credentials" });

    } catch (error) {
        console.error("Error fetching credentials:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// @desc    Update tournament room credentials
// @route   PUT /api/tournaments/:id/credentials
// @access  Private (Creator only)
export const updateTournamentCredentials = async (req, res) => {
    try {
        const { roomId, password, isPrivate } = req.body;

        const tournament = await Tournament.findById(req.params.id).select('+credentials.roomId +credentials.password +credentials.isPrivate');

        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        if (tournament.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update credentials" });
        }

        if (!tournament.credentials) {
            tournament.credentials = {};
        }

        if (roomId !== undefined) tournament.credentials.roomId = roomId;
        if (password !== undefined) tournament.credentials.password = password;
        if (isPrivate !== undefined) tournament.credentials.isPrivate = isPrivate;

        // Force save the nested object
        tournament.markModified('credentials');
        await tournament.save();

        res.status(200).json({ success: true, message: "Credentials updated successfully", data: tournament.credentials });

    } catch (error) {
        console.error("Error updating credentials:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
