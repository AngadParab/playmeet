import * as z from "zod";

export const tournamentSchema = z.object({
    name: z.string().min(3, "Tournament name must be at least 3 characters").max(100),
    gameTitle: z.enum(["Valorant", "CS2", "League of Legends", "Dota 2", "Rocket League", "Overwatch 2", "Fortnite", "Apex Legends", "Call of Duty", "PlayerUnknown's Battlegrounds", "Battlegrounds Mobile India", "Free Fire"], {
        required_error: "Please select a game",
    }),
    description: z.string().min(20, "Description must be at least 20 characters").max(1000).optional(),
    startDate: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Start date must be in the future",
    }),
    platform: z.enum(["PC", "Console", "Mobile", "Cross-Platform"]),
    serverLink: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    lobbyCode: z.string().optional(),
    entryFee: z.number().min(0, "Entry fee cannot be negative"),
    prizePool: z.string().min(1, "Prize pool is required"),
    maxParticipants: z.number().min(2, "Minimum 2 participants/teams").max(128, "Maximum 128 participants/teams"),
    teamSize: z.number().min(1, "Team size must be at least 1").max(10), // 1 for Solo
    bracketType: z.enum(["Single Elimination", "Double Elimination", "Round Robin", "Swiss"]),
    rules: z.string().optional(), // We'll handle splitting into array in component or backend
    region: z.string().default("Global"),
});

export const defaultTournamentValues = {
    name: "",
    gameTitle: "Valorant",
    description: "",
    startDate: "",
    platform: "PC",
    serverLink: "",
    lobbyCode: "",
    entryFee: 0,
    prizePool: "0",
    maxParticipants: 16,
    teamSize: 5,
    bracketType: "Single Elimination",
    rules: "",
    region: "Global",
};
