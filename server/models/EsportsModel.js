import mongoose from "mongoose";

const esportsModelSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        gamertag: {
            type: String,
            required: [true, "Gamertag is required"],
            trim: true,
            minlength: [2, "Gamertag must be at least 2 characters"],
            maxlength: [20, "Gamertag cannot exceed 20 characters"],
            unique: true,
        },
        platforms: [
            {
                type: String,
                enum: ["PC", "PlayStation", "Xbox", "Switch", "Mobile"],
            },
        ],
        games: [
            {
                name: {
                    type: String,
                    required: true,
                },
                rank: {
                    type: String,
                },
                role: {
                    type: String, // e.g., DPS, Support, IGL
                },
            },
        ],
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team", // See if Team model exists, otherwise generic string or Community
        },
        socialLinks: {
            discord: String,
            twitch: String,
            steam: String,
            youtube: String,
        },
        bio: {
            type: String,
            maxlength: [500, "Bio cannot exceed 500 characters"],
        },
        stats: {
            tournamentsParticipated: { type: Number, default: 0 },
            tournamentsWon: { type: Number, default: 0 },
            matchesPlayed: { type: Number, default: 0 },
            matchesWon: { type: Number, default: 0 },
        },
        availability: {
            type: String, // e.g., "Weekends", "Evenings"
        },
    },
    {
        timestamps: true,
    }
);

const EsportsProfile = mongoose.model("EsportsProfile", esportsModelSchema);

export default EsportsProfile;
