import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Tournament from './models/Tournament.js';
import User from './models/userModel.js';

dotenv.config();

const seedTournaments = async () => {
    try {
        await connectDB();

        // Find a user to assign as creator
        const user = await User.findOne({ email: 'parabangad123@gmail.com' });
        if (!user) {
            console.log("Test user not found, cannot seed tournaments.");
            process.exit(1);
        }

        const tournaments = [
            {
                name: "Valorant Community Clash",
                gameTitle: "Valorant",
                description: "Join the ultimate 5v5 tactical shooter community tournament.",
                startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                platform: "PC",
                region: "Global",
                entryFee: 0,
                prizePool: "$500",
                maxParticipants: 16,
                teamSize: 5,
                bracketType: "Single Elimination",
                createdBy: user._id,
                status: "Registration Open",
                images: [{ url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070", public_id: "test1" }],
                rules: ["No toxic behavior.", "Must join Discord."]
            },
            {
                name: "BGMI India Finals",
                gameTitle: "Battlegrounds Mobile India",
                description: "Top squads battle it out in Erangel.",
                startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                platform: "Mobile",
                region: "Asia",
                entryFee: 100,
                prizePool: "10000 Points",
                maxParticipants: 64,
                teamSize: 4,
                bracketType: "Round Robin",
                createdBy: user._id,
                status: "Ongoing",
                images: [{ url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070", public_id: "test2" }],
                rules: ["No emulators allowed."]
            },
            {
                name: "Apex Legends Trios",
                gameTitle: "Apex Legends",
                description: "Become the apex champion in this fast-paced tournament.",
                startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Started 1 day ago
                platform: "Cross-Platform",
                region: "NA",
                entryFee: 0,
                prizePool: "Free Entry",
                maxParticipants: 20,
                teamSize: 3,
                bracketType: "Swiss",
                createdBy: user._id,
                status: "Completed",
                images: [], // Test fallback image
                rules: ["All characters allowed."]
            }
        ];

        await Tournament.insertMany(tournaments);
        console.log("Successfully seeded tournaments!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
};

seedTournaments();
