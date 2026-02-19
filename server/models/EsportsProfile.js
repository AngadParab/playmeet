import mongoose from "mongoose";

const esportsProfileSchema = new mongoose.Schema(
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
            unique: true,
        },
        platform: {
            type: String,
            enum: ["PC", "PlayStation", "Xbox", "Switch", "Mobile"],
            default: "PC",
        },
        region: {
            type: String,
            enum: ["NA-East", "NA-West", "EU-West", "EU-Nordic", "dAsia", "OCE", "BR"],
            default: "NA-East",
        },
        games: [
            {
                gameTitle: {
                    type: String,
                    required: true,
                    enum: ["Valorant", "CS2", "League of Legends", "Dota 2", "Rocket League", "Overwatch 2", "Fortnite", "Apex Legends", "Call of Duty"],
                },
                rank: {
                    type: String,
                    default: "Unranked",
                },
                role: {
                    type: String,
                    default: "Flex",
                },
            },
        ],
        teams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team", // Assuming a Team model exists or will exist, otherwise just an ID
            },
        ],
        stats: {
            tournamentsPlayed: { type: Number, default: 0 },
            tournamentsWon: { type: Number, default: 0 },
            matchesWon: { type: Number, default: 0 },
        },
        bio: {
            type: String,
            maxlength: [200, "Bio cannot exceed 200 characters"],
        },
    },
    {
        timestamps: true,
    }
);

const EsportsProfile = mongoose.model("EsportsProfile", esportsProfileSchema);

export default EsportsProfile;
