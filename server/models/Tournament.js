import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tournament name is required"],
            trim: true,
            minlength: [3, "Tournament name must be at least 3 characters"],
        },
        gameTitle: {
            type: String,
            required: [true, "Game title is required"],
            enum: ["Valorant", "CS2", "League of Legends", "Dota 2", "Rocket League", "Overwatch 2", "Fortnite", "Apex Legends", "Call of Duty"],
        },
        description: {
            type: String,
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        serverLink: {
            type: String,
            trim: true, // e.g., Discord link
        },
        lobbyCode: {
            type: String,
            trim: true,
        },
        entryFee: {
            type: Number, // In 'Points' or currency
            default: 0,
        },
        prizePool: {
            type: String, // e.g. "$1000" or "10000 Points"
            default: "0"
        },
        bracketType: {
            type: String,
            enum: ["Single Elimination", "Double Elimination", "Round Robin", "Swiss"],
            default: "Single Elimination",
        },
        maxParticipants: { // Can be Teams or Players
            type: Number,
            default: 16,
        },
        teamSize: { // 1 for Solo, 5 for standard team, etc.
            type: Number,
            default: 1
        },
        participants: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                esportsProfile: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "EsportsProfile"
                },
                teamName: String, // Optional if it's a team tournament
                status: {
                    type: String,
                    enum: ["registered", "checked_in", "disqualified"],
                    default: "registered",
                },
                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        region: {
            type: String,
            default: "Global"
        },
        platform: {
            type: String,
            default: "PC"
        },
        status: {
            type: String,
            enum: ["Registration Open", "Registration Closed", "Ongoing", "Completed", "Cancelled"],
            default: "Registration Open",
        },
        images: [
            {
                url: String,
                public_id: String
            }
        ],
        rules: [String]
    },
    {
        timestamps: true,
    }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;
