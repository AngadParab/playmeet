import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Trophy, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/utils/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TournamentCard from '@/components/esports/tournaments/TournamentCard';
import RegistrationSidebar from '@/components/esports/tournaments/RegistrationSidebar';

import { useEsports } from '@/context/EsportsContext';
import { useAuth } from '@/hooks/useAuth';

const TournamentBrowser = () => {
    const navigate = useNavigate();
    const { tournaments, getAllTournaments, loading } = useEsports();
    const { user } = useAuth();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        getAllTournaments();
    }, []);

    // Filter tournaments
    const filteredTournaments = tournaments.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.gameTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mock user profile for now - replace with actual auth/profile fetch
    const userProfile = {
        gamertag: user?.username || "Guest",
        platform: "PC",
        region: "NA-East",
        rank: "Unranked"
    };

    const handleJoinClick = (tournament) => {
        if (!user) {
            toast.error("Please log in to join tournaments.");
            // navigate('/login'); // Optional: Redirect to login
            return;
        }

        // Check if already joined
        const currentUserId = user?._id?.toString() || user?.id?.toString();
        const isParticipant = tournament.participants?.some(p => {
            const participantId = typeof p.user === 'string' ? p.user : p.user?._id || p.user?.id;
            if (participantId?.toString() === currentUserId) return true;

            // Check team members
            const isTeamMember = p.teamMembers?.some(member => {
                const memberId = typeof member.user === 'object' ? member.user?._id || member.user?.id : member.user;
                return memberId?.toString() === currentUserId;
            });

            return isTeamMember;
        });

        if (isParticipant) {
            navigate(`/esports/tournaments/${tournament._id}/lobby`);
        } else {
            setSelectedTournament(tournament);
            setIsSidebarOpen(true);
        }
    };

    const handleConfirmRegistration = async (teamName) => {
        if (!selectedTournament) return;

        try {
            const response = await api.post(`/tournaments/${selectedTournament._id}/join`, {
                teamName: teamName || (user.username + "'s Team")
            });

            if (response.data.success) {
                toast.success("Successfully registered!");
                setIsSidebarOpen(false);
                // Refresh tournaments to update UI state
                getAllTournaments();
                // Navigate to lobby
                navigate(`/esports/tournaments/${selectedTournament._id}/lobby`);
            }
        } catch (error) {
            console.error("Registration error:", error);
            const msg = error.response?.data?.message || "Failed to register";
            toast.error(msg);
        }
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

                    <Link to="/esports/tournaments/create">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-6 shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:scale-105">
                            <Sparkles className="w-5 h-5 mr-2" />
                            Host Tournament
                        </Button>
                    </Link>
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
                    {loading ? (
                        <div className="col-span-full text-center py-20 text-gray-400">Loading tournaments...</div>
                    ) : filteredTournaments.length > 0 ? (
                        filteredTournaments.map((tournament) => (
                            <TournamentCard
                                key={tournament._id}
                                tournament={tournament}
                                onJoin={handleJoinClick}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No tournaments found matching your criteria.</p>
                        </div>
                    )}
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

export default TournamentBrowser;
