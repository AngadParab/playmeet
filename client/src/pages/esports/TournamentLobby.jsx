import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import api from '@/utils/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Users, Lock, Unlock, Clock, ShieldCheck, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const TournamentLobby = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [credentials, setCredentials] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');
    const [inviteLink, setInviteLink] = useState('');

    useEffect(() => {
        fetchTournamentData();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [id]);

    const fetchTournamentData = async () => {
        try {
            const { data } = await api.get(`/tournaments/${id}`);
            if (data.success) {
                setTournament(data.data);
                setInviteLink(`${window.location.origin}/esports/tournaments/${id}/lobby`);

                // Attempt to fetch credentials if starting soon
                checkCredentials(data.data);
            }
        } catch (error) {
            console.error("Error loading lobby:", error);
            toast.error("Failed to load lobby.");
            navigate('/esports/tournaments'); // Redirect if error
        } finally {
            setLoading(false);
        }
    };

    const checkCredentials = async (data) => {
        // Backend determines if it should be revealed based on time/isPrivate
        try {
            const credRes = await api.get(`/tournaments/${id}/credentials`);
            if (credRes.data.success && credRes.data.data) {
                setCredentials(credRes.data.data);
            }
        } catch (err) {
            // Ignore 403 (too early)
        }
    };

    const updateTimer = () => {
        if (!tournament) return;

        const now = new Date();
        const start = new Date(tournament.startDate);
        const diff = start - now;

        if (diff > 0 && diff <= 5 * 60 * 1000 && !credentials) {
            // Check credentials every 10 seconds during the last 5 minutes
            if (Math.floor(diff / 1000) % 10 === 0) {
                checkCredentials(tournament);
            }
        }

        if (diff <= 0) {
            setTimeLeft("Tournament has started!");
            if (!credentials) checkCredentials(tournament); // Retry fetch
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    if (loading) return <div className="text-white text-center py-20">Loading Lobby...</div>;
    if (!tournament) return null;

    // Find current user's participation record
    const currentUserId = user?._id?.toString() || user?.id?.toString();
    const myParticipant = tournament.participants.find(p => {
        const participantId = typeof p.user === 'object' ? p.user?._id || p.user?.id : p.user;
        if (participantId?.toString() === currentUserId) return true;
        const isTeamMember = p.teamMembers?.some(member => {
            const memberId = typeof member.user === 'object' ? member.user?._id || member.user?.id : member.user;
            return memberId?.toString() === currentUserId;
        });
        return isTeamMember;
    });

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                                {tournament.status}
                            </Badge>
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Starts in: {timeLeft}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold">{tournament.name} <span className="text-cyan-400">Lobby</span></h1>
                        <p className="text-gray-400">Format: {tournament.maxPerTeam > 1 ? `${tournament.maxPerTeam}v${tournament.maxPerTeam} (Team)` : "Solo"}</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="border-gray-700 hover:bg-white/10" onClick={() => navigate('/esports/tournaments')}>
                            Back to Browser
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                            Leave Lobby
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Squad/Team View */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-400" />
                                    Your Squad
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Slot 1: You (Captain) */}
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-purple-500/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                                                {user.username[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold flex items-center gap-2">
                                                    {user.username}
                                                    <Badge variant="outline" className="text-xs border-purple-500 text-purple-400">Captain</Badge>
                                                </div>
                                                <div className="text-xs text-green-400">Ready</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty Slots */}
                                    {Array.from({ length: tournament.maxPerTeam - 1 }).map((_, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 border-dashed">
                                            <div className="flex items-center gap-3 opacity-50">
                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                    <UserPlus className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">Empty Slot</div>
                                                    <div className="text-xs">Invite a friend</div>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/20">
                                                <UserPlus className="w-4 h-4 mr-2" /> Invite
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rules / Info */}
                        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                                    Tournament Rules
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-300 space-y-2">
                                <p>1. Cheating or using third-party software will result in an immediate ban.</p>
                                <p>2. Be respectful to all players and admins.</p>
                                <p>3. Check-in is required 15 minutes before the start time.</p>
                                <p>4. Join the lobby using the provided credentials below.</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Credentials & Status */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    {credentials ? <Unlock className="w-5 h-5 text-green-400" /> : <Lock className="w-5 h-5 text-red-400" />}
                                    Match Credentials
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {credentials ? (
                                    <div className="space-y-4 animate-in fade-in duration-500">
                                        <div>
                                            <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Room ID</label>
                                            <div className="flex gap-2 mt-1">
                                                <Input readOnly value={credentials.roomId || 'Not set'} className="bg-black/50 border-purple-500/50 text-white font-mono" />
                                                <Button size="icon" variant="outline" onClick={() => copyToClipboard(credentials.roomId || 'Not set')}>
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Password</label>
                                            <div className="flex gap-2 mt-1">
                                                <Input readOnly value={credentials.password || 'No password'} className="bg-black/50 border-purple-500/50 text-white font-mono" />
                                                <Button size="icon" variant="outline" onClick={() => copyToClipboard(credentials.password || 'No password')}>
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center">
                                            Credentials revealed! Good luck.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-400 space-y-3">
                                        <Lock className="w-12 h-12 mx-auto opacity-20" />
                                        <p>Credentials are locked.</p>
                                        <p className="text-xs text-gray-500">
                                            They will be revealed automatically 5 minutes before the match starts, or whenever the host makes them public.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="bg-black/40 border-white/10">
                            <CardContent className="pt-6">
                                <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2 block">Lobby Invite Link</label>
                                <div className="flex gap-2">
                                    <Input readOnly value={inviteLink} className="bg-black/50 border-white/10 text-gray-300 text-sm" />
                                    <Button size="icon" variant="ghost" onClick={() => copyToClipboard(inviteLink)}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentLobby;
