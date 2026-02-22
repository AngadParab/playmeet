import EsportsProfile from "../../models/EsportsProfile.js";
import User from "../../models/userModel.js";

// @desc    Get current user's esports profile
// @route   GET /api/esports/profile/me
// @access  Private
export const getEsportsProfile = async (req, res) => {
    try {
        const profile = await EsportsProfile.findOne({ user: req.user._id })
            .populate('user', 'name avatar username');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Esports profile not found"
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error("Error fetching esports profile:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// @desc    Create or update esports profile
// @route   POST /api/esports/profile
// @access  Private
export const createEsportsProfile = async (req, res) => {
    try {
        const { gamertag, bio, games, platform, region } = req.body;

        // Validation
        if (!gamertag) {
            return res.status(400).json({
                success: false,
                message: "Gamertag is required"
            });
        }

        const profileFields = {
            user: req.user._id,
            gamertag,
            bio,
            platform,
            region,
            games: games || []
        };

        // Check if profile exists
        let profile = await EsportsProfile.findOne({ user: req.user._id });

        if (profile) {
            // Update
            profile = await EsportsProfile.findOneAndUpdate(
                { user: req.user._id },
                { $set: profileFields },
                { new: true }
            );
            return res.status(200).json({
                success: true,
                message: "Esports profile updated",
                data: profile
            });
        }

        // Check if gamertag is taken
        const existingGamertag = await EsportsProfile.findOne({ gamertag });
        if (existingGamertag) {
            return res.status(400).json({
                success: false,
                message: "Gamertag is already taken"
            });
        }

        // Create
        profile = await EsportsProfile.create(profileFields);

        res.status(201).json({
            success: true,
            message: "Esports profile created",
            data: profile
        });
    } catch (error) {
        console.error("Error creating esports profile:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// @desc    Get all gamers (for directory)
// @route   GET /api/esports/gamers
// @access  Public
export const getGamers = async (req, res) => {
    try {
        const { search, game, rank, region, page = 1, limit = 12 } = req.query;
        const query = {};

        if (search) {
            query.gamertag = { $regex: search, $options: 'i' };
        }

        if (game && game !== 'all') {
            query['games.gameTitle'] = game;
        }

        if (rank && rank !== 'all') {
            query['games.rank'] = rank;
        }

        if (region && region !== '') {
            query.region = region;
        }

        const gamers = await EsportsProfile.find(query)
            .populate('user', 'name avatar username')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await EsportsProfile.countDocuments(query);

        res.status(200).json({
            success: true,
            data: gamers,
            pagination: {
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            }
        });
    } catch (error) {
        console.error("Error fetching gamers:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// @desc    Get gamer by ID
// @route   GET /api/esports/gamers/:id
// @access  Public
export const getGamerById = async (req, res) => {
    try {
        const profile = await EsportsProfile.findById(req.params.id)
            .populate('user', 'name avatar username');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Gamer not found"
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error("Error fetching gamer:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
