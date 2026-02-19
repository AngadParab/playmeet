import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Trophy, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TournamentCard from '@/components/esports/tournaments/TournamentCard';
import RegistrationSidebar from '@/components/esports/tournaments/RegistrationSidebar';
// import { useEsports } from '@/hooks/useEsports'; // Assuming a hook exists, or we mock/fetch here

const EsportsTournaments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Mock user profile for now - replace with actual auth/profile fetch
    const userProfile = {
        gamertag: "ShadowSlayer",
        platform: "PC",
        region: "NA-East",
        rank: "Diamond 2"
    };

    // Mock tournaments data (until API hook is ready/populated)
    const tournaments = [
        {
            _id: "1",
            name: "Valorant Community Cup",
            gameTitle: "Valorant",
            status: "Registration Open",
            startDate: new Date("2024-10-15"),
            prizePool: "$500",
            participants: new Array(16).fill({}),
            maxParticipants: 32,
            platform: "PC",
            region: "NA-East",
            bracketType: "Single Elimination"
        },
        {
            _id: "2",
            name: "CS2 Weekend Warfare",
            gameTitle: "CS2",
            status: "Ongoing",
            startDate: new Date("2024-10-20"),
            prizePool: "$250",
            participants: new Array(8).fill({}),
            maxParticipants: 16,
            platform: "PC",
            region: "EU-West",
            bracketType: "Double Elimination"
        },
        {
            _id: "3",
            name: "Rocket League Rumble",
            gameTitle: "Rocket League",
            status: "Registration Open",
            startDate: new Date("2024-10-22"),
            prizePool: "10,000 Pts",
            participants: new Array(24).fill({}),
            maxParticipants: 64,
            platform: "Crossplay",
            region: "Global",
            bracketType: "Swiss"
        }
    ];

    const handleJoinClick = (tournament) => {
        setSelectedTournament(tournament);
        setIsSidebarOpen(true);
    };

    const handleConfirmRegistration = (teamName) => {
        console.log("Registering for", selectedTournament.name, "as", teamName || "Solo");
        setIsSidebarOpen(false);
        // Call API join endpoint here
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-3">
                            <Trophy className="w-4 h-4" />
                            <span>Competitive Season 4</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-white">
                            Tournament <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Nexus</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl text-lg">
                            Compete in high-stakes tournaments, climb the ladder, and prove your dominance in the arena.
                        </p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-6 shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:scale-105">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Host Tournament
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <Input
                            placeholder="Search tournaments by game or name..."
                            className="pl-10 h-12 bg-black/40 border-gray-800 text-white focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-12 border-gray-800 bg-black/40 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl">
                        <Filter className="w-5 h-5 mr-2" />
                        Filters
                    </Button>
                </div>

                {/* Tournament Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tournaments.map((tournament) => (
                        <TournamentCard
                            key={tournament._id}
                            tournament={tournament}
                            onJoin={handleJoinClick}
                        />
                    ))}
                </div>
            </div>

            {/* Registration Sidebar */}
            <RegistrationSidebar
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
                tournament={selectedTournament}
                userProfile={userProfile}
                onConfirm={handleConfirmRegistration}
            />
        </div>
    );
};

export default EsportsTournaments;
