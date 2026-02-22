import { useState, useEffect } from 'react';
import { useEsports } from '@/context/EsportsContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Calendar, Trophy, Users, Gamepad2, Globe, Server, DollarSign, FileText, Image as ImageIcon, Loader2, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import api from '@/utils/api';
import { tournamentSchema, defaultTournamentValues } from '@/schemas/tournamentSchema'; // Build this schema
import { useAuth } from '@/hooks/useAuth';

const CreateTournament = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getEsportsProfile, createEsportsProfile } = useEsports();

    // State
    const [isLoading, setIsLoading] = useState(false);
    const [checkingProfile, setCheckingProfile] = useState(true);
    const [showProfileSetup, setShowProfileSetup] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Profile Form State
    const [gamertag, setGamertag] = useState('');
    const [bio, setBio] = useState('');

    // Tournament Form
    const form = useForm({
        resolver: zodResolver(tournamentSchema),
        defaultValues: defaultTournamentValues,
    });

    const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
    const gameTitle = watch('gameTitle');

    // Check for profile on mount
    useEffect(() => {
        const checkProfile = async () => {
            const profile = await getEsportsProfile();
            if (!profile) {
                setShowProfileSetup(true);
                // Pre-fill gamertag with username if available
                if (user?.username) setGamertag(user.username);
            }
            setCheckingProfile(false);
        };
        checkProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createEsportsProfile({
                gamertag,
                bio,
                platform: 'PC', // Default or add selector
                region: 'NA-East' // Default or add selector
            });
            setShowProfileSetup(false);
        } catch (error) {
            console.error("Profile creation failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // 1. Upload Image (if any)
            let uploadedImages = [];
            if (imageFile) {
                const formData = new FormData();
                formData.append('eventImages', imageFile);

                const uploadResponse = await api.post('/upload/event', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (uploadResponse.data.success) {
                    uploadedImages = uploadResponse.data.fileUrls;
                }
            }

            // 2. Create Tournament
            const tournamentData = {
                ...data,
                images: uploadedImages,
                rules: data.rules ? data.rules.split('\n').filter(r => r.trim() !== '') : [],
            };

            const response = await api.post('/tournaments', tournamentData);

            if (response.data.success) {
                toast.success('Tournament hosted successfully!');
                navigate('/esports/tournaments');
            }
        } catch (error) {
            console.error('Error creating tournament:', error);
            const message = error.response?.data?.message || 'Failed to create tournament';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (checkingProfile) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
        );
    }

    if (showProfileSetup) {
        return (
            <div className="min-h-screen bg-[#09090b] text-slate-200 py-12 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 max-w-md">
                    <Card className="bg-slate-900/50 border-violet-500/20 backdrop-blur-sm shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white flex items-center gap-2">
                                <Gamepad2 className="w-6 h-6 text-violet-400" />
                                Setup Esports Profile
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                                You need an Esports Profile to host tournaments.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreateProfile} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="gamertag" className="text-slate-300">Gamertag</Label>
                                    <Input
                                        id="gamertag"
                                        value={gamertag}
                                        onChange={(e) => setGamertag(e.target.value)}
                                        className="bg-slate-950 border-slate-800 text-white focus:ring-violet-500"
                                        placeholder="Enter your unique gamertag"
                                        required
                                    />
                                    <p className="text-xs text-slate-500">This will be displayed in tournaments.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-slate-300">Bio (Optional)</Label>
                                    <Textarea
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="bg-slate-950 border-slate-800 text-white focus:ring-violet-500"
                                        placeholder="Tell us about your gaming style..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading || !gamertag}
                                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Create Profile & Continue
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-slate-200 py-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                <div className="mb-8">
                    <Link to="/esports" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Lobby
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-sans tracking-tight">Host a Tournament</h1>
                    <p className="text-slate-400 mt-2">Create your own competitive arena and invite players.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Info */}
                    <Card className="bg-slate-900/50 border-violet-500/20 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-violet-400" />
                                Basic Information
                            </CardTitle>
                            <CardDescription className="text-slate-400">Set the stage for your tournament.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-300">Tournament Name</Label>
                                    <Input
                                        id="name"
                                        {...register('name')}
                                        className="bg-slate-950 border-slate-800 text-white focus:ring-violet-500 focus:border-violet-500"
                                        placeholder="e.g. Valorant Community Cup"
                                    />
                                    {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gameTitle" className="text-slate-300">Game Title</Label>
                                    <Select onValueChange={(val) => setValue('gameTitle', val)} defaultValue={defaultTournamentValues.gameTitle}>
                                        <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                            <SelectValue placeholder="Select a game" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {["Valorant", "CS2", "League of Legends", "Dota 2", "Rocket League", "Overwatch 2", "Fortnite", "Apex Legends", "Call of Duty", "PlayerUnknown's Battlegrounds", "Battlegrounds Mobile India", "Free Fire"].map(game => (
                                                <SelectItem key={game} value={game}>{game}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.gameTitle && <p className="text-red-400 text-xs">{errors.gameTitle.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-slate-300">Description</Label>
                                <Textarea
                                    id="description"
                                    {...register('description')}
                                    className="bg-slate-950 border-slate-800 text-white focus:ring-violet-500 focus:border-violet-500 min-h-[100px]"
                                    placeholder="Tell participants about your tournament..."
                                />
                                {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label className="text-slate-300">Tournament Banner</Label>
                                <div className="flex flex-col md:flex-row gap-4 items-start">
                                    <div className="flex-1 w-full">
                                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-800 border-dashed rounded-lg cursor-pointer bg-slate-950/50 hover:bg-slate-900 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <ImageIcon className="w-8 h-8 text-slate-500 mb-2" />
                                                <p className="text-sm text-slate-500 font-semibold">Click to upload banner</p>
                                                <p className="text-xs text-slate-600">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                    {imagePreview && (
                                        <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-1 right-1 h-6 w-6"
                                                onClick={() => {
                                                    setImageFile(null);
                                                    setImagePreview(null);
                                                }}
                                            >
                                                <span className="sr-only">Remove</span>
                                                <span className="text-xs">×</span>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Schedule & Format */}
                    <Card className="bg-slate-900/50 border-violet-500/20 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-cyan-400" />
                                Schedule & Format
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate" className="text-slate-300">Start Date & Time</Label>
                                    <div className="relative">
                                        <Input
                                            id="startDate"
                                            type="datetime-local"
                                            {...register('startDate')}
                                            className="bg-slate-950 border-slate-800 text-white appearance-none" // appearance-none helps with some browser defaults
                                        />
                                        {/* Note: Icon positioning might overlap native picker icon, adjusting or removing */}
                                    </div>
                                    {errors.startDate && <p className="text-red-400 text-xs">{errors.startDate.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="platform" className="text-slate-300">Platform</Label>
                                    <Select onValueChange={(val) => setValue('platform', val)} defaultValue={defaultTournamentValues.platform}>
                                        <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                            <SelectValue placeholder="Select Platform" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {["PC", "Console", "Mobile", "Cross-Platform"].map(p => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.platform && <p className="text-red-400 text-xs">{errors.platform.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="bracketType" className="text-slate-300">Format</Label>
                                    <Select onValueChange={(val) => setValue('bracketType', val)} defaultValue={defaultTournamentValues.bracketType}>
                                        <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                            <SelectValue placeholder="Select Format" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {["Single Elimination", "Double Elimination", "Round Robin", "Swiss"].map(Type => (
                                                <SelectItem key={Type} value={Type}>{Type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.bracketType && <p className="text-red-400 text-xs">{errors.bracketType.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="maxParticipants" className="text-slate-300">Max Teams/Players</Label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input
                                            id="maxParticipants"
                                            type="number"
                                            {...register('maxParticipants', { valueAsNumber: true })}
                                            className="pl-9 bg-slate-950 border-slate-800 text-white"
                                        />
                                    </div>
                                    {errors.maxParticipants && <p className="text-red-400 text-xs">{errors.maxParticipants.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="teamSize" className="text-slate-300">Team Size</Label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input
                                            id="teamSize"
                                            type="number"
                                            {...register('teamSize', { valueAsNumber: true })}
                                            className="pl-9 bg-slate-950 border-slate-800 text-white"
                                            placeholder="1 for Solo"
                                        />
                                    </div>
                                    {errors.teamSize && <p className="text-red-400 text-xs">{errors.teamSize.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="serverLink" className="text-slate-300">Server/Discord Link (Optional)</Label>
                                    <div className="relative">
                                        <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input
                                            id="serverLink"
                                            {...register('serverLink')}
                                            className="pl-9 bg-slate-950 border-slate-800 text-white"
                                            placeholder="https://discord.gg/..."
                                        />
                                    </div>
                                    {errors.serverLink && <p className="text-red-400 text-xs">{errors.serverLink.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lobbyCode" className="text-slate-300">Lobby Code (Optional)</Label>
                                    <div className="relative">
                                        <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <Input
                                            id="lobbyCode"
                                            {...register('lobbyCode')}
                                            className="pl-9 bg-slate-950 border-slate-800 text-white"
                                            placeholder="e.g. 1234-5678"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Prizes & Rules */}
                    <Card className="bg-slate-900/50 border-violet-500/20 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-yellow-400" />
                                Prizes & Entry
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="entryFee" className="text-slate-300">Entry Fee (Points)</Label>
                                    <Input
                                        id="entryFee"
                                        type="number"
                                        {...register('entryFee', { valueAsNumber: true })}
                                        className="bg-slate-950 border-slate-800 text-white"
                                        placeholder="0 for Free"
                                    />
                                    {errors.entryFee && <p className="text-red-400 text-xs">{errors.entryFee.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prizePool" className="text-slate-300">Prize Pool</Label>
                                    <Input
                                        id="prizePool"
                                        {...register('prizePool')}
                                        className="bg-slate-950 border-slate-800 text-white"
                                        placeholder="e.g. $1000 or 5000 XP"
                                    />
                                    {errors.prizePool && <p className="text-red-400 text-xs">{errors.prizePool.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rules" className="text-slate-300">Rules</Label>
                                <Textarea
                                    id="rules"
                                    {...register('rules')}
                                    className="bg-slate-950 border-slate-800 text-white focus:ring-violet-500 focus:border-violet-500 min-h-[150px]"
                                    placeholder="Enter each rule on a new line..."
                                />
                                <p className="text-xs text-slate-500">Each line will be treated as a separate rule.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="region" className="text-slate-300">Region</Label>
                                <Select onValueChange={(val) => setValue('region', val)} defaultValue={defaultTournamentValues.region}>
                                    <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                        <SelectValue placeholder="Select Region" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        {["Global", "NA", "EU", "Asia", "SA", "OCE"].map(r => (
                                            <SelectItem key={r} value={r}>{r}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-6 text-lg shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Creating Arena...
                                </>
                            ) : (
                                "Host Tournament"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTournament;
