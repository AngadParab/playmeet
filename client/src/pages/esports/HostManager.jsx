import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import api from '@/utils/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Settings, Users, Settings2, Trash2, ArrowLeft, Loader2, Save, UserX, AlertTriangle, ShieldCheck, Lock } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const HostManager = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingRoom, setIsSavingRoom] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Form inputs
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: '',
    });

    const [roomData, setRoomData] = useState({
        roomId: '',
        password: '',
        isPrivate: true
    });

    useEffect(() => {
        fetchTournament();
    }, [id]);

    const fetchTournament = async () => {
        try {
            setLoading(true);
            const { data } = await api.get(`/tournaments/${id}`);
            if (data.success) {
                // Ensure the current user is the creator
                const currentUserId = user?._id?.toString() || user?.id?.toString();
                const creatorId = typeof data.data.createdBy === 'object'
                    ? data.data.createdBy?._id?.toString() || data.data.createdBy?.id?.toString()
                    : data.data.createdBy?.toString();

                if (creatorId !== currentUserId) {
                    toast.error("Unauthorized access.");
                    navigate('/esports/dashboard');
                    return;
                }

                setTournament(data.data);
                setFormData({
                    name: data.data.name,
                    description: data.data.description,
                    status: data.data.status,
                });

                // Fetch Credentials if host
                try {
                    const credRes = await api.get(`/tournaments/${id}/credentials`);
                    if (credRes.data.success && credRes.data.data) {
                        setRoomData({
                            roomId: credRes.data.data.roomId || '',
                            password: credRes.data.data.password || '',
                            isPrivate: credRes.data.data.isPrivate !== false
                        });
                    }
                } catch (e) {
                    console.log("Could not fetch credentials", e);
                }
            }
        } catch (error) {
            console.error("Error fetching tournament:", error);
            toast.error("Failed to load tournament data");
            navigate('/esports/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async () => {
        try {
            setIsSaving(true);
            const { data } = await api.put(`/tournaments/${id}`, {
                name: formData.name,
                description: formData.description,
            });
            if (data.success) {
                toast.success("Tournament details updated");
                setTournament(data.data);
            }
        } catch (error) {
            console.error("Error updating:", error);
            toast.error(error.response?.data?.message || "Failed to update tournament");
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateRoom = async () => {
        try {
            setIsSavingRoom(true);
            const { data } = await api.put(`/tournaments/${id}/credentials`, roomData);
            if (data.success) {
                toast.success("Room credentials saved securely");
            }
        } catch (error) {
            console.error("Error updating credentials:", error);
            toast.error(error.response?.data?.message || "Failed to update credentials");
        } finally {
            setIsSavingRoom(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            const { data } = await api.put(`/tournaments/${id}/status`, { status: newStatus });
            if (data.success) {
                toast.success(`Status updated to ${newStatus}`);
                setFormData(prev => ({ ...prev, status: newStatus }));
                setTournament(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleKickParticipant = async (participantUserId) => {
        try {
            const { data } = await api.post(`/tournaments/${id}/participants/${participantUserId}/kick`);
            if (data.success) {
                toast.success("Participant removed from tournament");
                // Local state update
                setTournament(prev => ({
                    ...prev,
                    participants: prev.participants.filter(p => p.user._id !== participantUserId)
                }));
            }
        } catch (error) {
            console.error("Error kicking participant:", error);
            toast.error("Failed to remove participant");
        }
    };

    const handleDeleteTournament = async () => {
        try {
            const { data } = await api.delete(`/tournaments/${id}`);
            if (data.success) {
                toast.success("Tournament cancelled and deleted");
                navigate('/esports/dashboard');
            }
        } catch (error) {
            console.error("Error deleting tournament:", error);
            toast.error("Failed to delete tournament");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    if (!tournament) return null;

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header & Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                    <div>
                        <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-white p-0 h-auto mb-2"
                            onClick={() => navigate('/esports/dashboard')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Button>
                        <h1 className="text-3xl font-bold font-heading">
                            Manage: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{tournament.name}</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Select value={formData.status} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-[180px] bg-black/50 border-white/10 text-white">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-white/10 text-white">
                                <SelectItem value="Registration Open">Registration Open</SelectItem>
                                <SelectItem value="Registration Closed">Registration Closed</SelectItem>
                                <SelectItem value="Ongoing">Ongoing</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Badge className={`${tournament.status === 'Ongoing' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            tournament.status === 'Completed' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' :
                                'bg-purple-500/20 text-purple-400 border-purple-500/30'
                            }`}>
                            {tournament.status}
                        </Badge>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 space-y-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className="flex items-center gap-2"><Settings2 className="w-4 h-4" /> Overview</div>
                        </button>
                        <button
                            onClick={() => setActiveTab('room')}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'room' ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Room Details</div>
                        </button>
                        <button
                            onClick={() => setActiveTab('participants')}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'participants' ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Participants</div>
                            <Badge variant="secondary" className="bg-black/50">{tournament.participants?.length || 0}</Badge>
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-red-600/20 text-red-400 border border-red-600/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
                        >
                            <div className="flex items-center gap-2"><Settings className="w-4 h-4" /> Danger Zone</div>
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="lg:col-span-3">

                        {/* OVERVIEW TAB */}
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Tournament Details</CardTitle>
                                        <CardDescription className="text-gray-400">Update the core information shown to players.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Tournament Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="bg-black/50 border-white/10 focus:border-purple-500 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Description</label>
                                            <Textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="bg-black/50 border-white/10 focus:border-purple-500 text-white min-h-[100px]"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div>
                                                <p className="text-xs text-gray-500">Game</p>
                                                <p className="font-medium">{tournament.gameTitle}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Format</p>
                                                <p className="font-medium">{tournament.bracketType} ({tournament.maxPerTeam}v{tournament.maxPerTeam})</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Prize Pool</p>
                                                <p className="font-medium text-green-400">{tournament.prizePool}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Entry Fee</p>
                                                <p className="font-medium">{tournament.entryFee === 0 ? "Free" : `${tournament.entryFee} Points`}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 flex justify-end">
                                            <Button
                                                onClick={handleUpdateDetails}
                                                disabled={isSaving}
                                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                            >
                                                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                                Save Changes
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* ROOM DETAILS TAB */}
                        {activeTab === 'room' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                            Room Credentials
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">Securely manage the lobby ID and password for the tournament participants.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Room ID / Match ID</label>
                                            <Input
                                                value={roomData.roomId}
                                                onChange={(e) => setRoomData({ ...roomData, roomId: e.target.value })}
                                                placeholder="e.g. 123456789"
                                                className="bg-black/50 border-white/10 focus:border-cyan-500 text-white font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Room Password</label>
                                            <Input
                                                value={roomData.password}
                                                onChange={(e) => setRoomData({ ...roomData, password: e.target.value })}
                                                placeholder="Leave blank if no password"
                                                className="bg-black/50 border-white/10 focus:border-cyan-500 text-white font-mono"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-white/5 mt-4">
                                            <div className="space-y-0.5">
                                                <div className="font-medium text-white flex items-center gap-2">
                                                    Protect Credentials <Lock className="w-4 h-4 text-purple-400" />
                                                </div>
                                                <div className="text-sm text-gray-400">Hide these details until 5 minutes prior to start time.</div>
                                            </div>
                                            <Switch
                                                checked={roomData.isPrivate}
                                                onCheckedChange={(checked) => setRoomData({ ...roomData, isPrivate: checked })}
                                                className="data-[state=checked]:bg-purple-600"
                                            />
                                        </div>
                                    </CardContent>
                                    <div className="p-6 pt-0 border-t border-white/5 mt-4">
                                        <Button
                                            onClick={handleUpdateRoom}
                                            disabled={isSavingRoom}
                                            className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold"
                                        >
                                            {isSavingRoom ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                            Save Room Details
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {/* PARTICIPANTS TAB */}
                        {activeTab === 'participants' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Manage Roster</CardTitle>
                                        <CardDescription className="text-gray-400">
                                            {tournament.participants?.length} / {tournament.maxParticipants} Registered {tournament.maxPerTeam > 1 ? 'Teams' : 'Players'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {tournament.participants?.length === 0 ? (
                                            <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-lg bg-black/20">
                                                <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                                <p>No participants registered yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {tournament.participants.map(p => (
                                                    <div key={p._id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg hover:border-white/10 transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center font-bold text-purple-200">
                                                                {(p.teamName?.[0] || p.user?.username?.[0] || '?').toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-white">
                                                                    {tournament.maxPerTeam > 1 && p.teamName ? p.teamName : p.user?.username || 'Unknown User'}
                                                                </p>
                                                                <p className="text-xs text-gray-400">
                                                                    Registered: {new Date(p.joinedAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                                                    <UserX className="w-4 h-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-[#09090b] border-white/10 text-white">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Remove Participant?</AlertDialogTitle>
                                                                    <AlertDialogDescription className="text-gray-400">
                                                                        Are you sure you want to kick this participant from the tournament? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-white/5">Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleKickParticipant(p.user._id || p.user)} className="bg-red-600 hover:bg-red-700 text-white">
                                                                        Remove
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* SETTINGS TAB */}
                        {activeTab === 'settings' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <Card className="bg-red-950/20 border-red-900/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-red-400 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5" /> Danger Zone
                                        </CardTitle>
                                        <CardDescription className="text-gray-400">Irreversible destructive actions for this tournament.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border border-red-900/30 rounded-lg bg-black/40">
                                            <div>
                                                <h4 className="font-bold text-white">Cancel Tournament</h4>
                                                <p className="text-sm text-gray-400 max-w-sm">
                                                    Permanently delete this tournament. All registered participants will be removed and fees refunded (if applicable).
                                                </p>
                                            </div>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 font-bold whitespace-nowrap">
                                                        <Trash2 className="w-4 h-4 mr-2" /> Cancel Tournament
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-[#09090b] border-white/10 text-white">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-red-400 flex items-center gap-2">
                                                            <AlertTriangle className="w-5 h-5" /> Are you absolutely sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription className="text-gray-400">
                                                            This action cannot be undone. This will permanently delete the <strong>{tournament.name}</strong> tournament and remove all related data from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-white/5">No, keep it</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleDeleteTournament} className="bg-red-600 hover:bg-red-700 text-white font-bold">
                                                            Yes, cancel tournament
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostManager;
