import { z } from "zod";

export const esportsSchema = z.object({
    gamertag: z.string().min(2, "Gamertag must be at least 2 characters").max(20, "Gamertag must be at most 20 characters"),
    platform: z.enum(["PC", "PlayStation", "Xbox", "Switch", "Mobile"], {
        required_error: "Please select a platform",
    }),
    games: z.array(z.string()).min(1, "Select at least one game"),
    rank: z.string().optional(),
    discordId: z.string().optional(),
    streamingUrl: z.string().url().optional().or(z.literal("")),
});
