import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search,
    SlidersHorizontal,
    X,
    Users,
    MapPin,
    Filter,
    ChevronLeft,
    ChevronRight,
    Star,
    Grid3X3,
    List,
    Sparkles,
    Gamepad2
} from 'lucide-react';
import { useEsports } from '@/context/EsportsContext'; // Assuming context exists
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import GamerCard from '@/components/esports/GamerCard'; // Assuming component exists

// Game categories
const gameCategories = [
    { value: 'all', label: 'All Games' },
    { value: 'Valorant', label: 'Valorant' },
    { value: 'CS2', label: 'CS2' },
    { value: 'League of Legends', label: 'League of Legends' },
    { value: 'Dota 2', label: 'Dota 2' },
    { value: 'Rocket League', label: 'Rocket League' },
    { value: 'Overwatch 2', label: 'Overwatch 2' },
];

const FeaturedGamers = ({ gamers, currentUser, onFollow }) => {
    if (!gamers || gamers.length === 0) return null;

    const featured = gamers.slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
        >
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Featured Gamers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featured.map((gamer, i) => (
                    <Link key={gamer._id} to={`/profile/${gamer._id}`}>
                        <Card className="border-purple-500/20 bg-slate-900/50 hover:border-purple-500/50 transition-all group overflow-hidden backdrop-blur-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-16 h-16 border-2 border-purple-500/30">
                                        <AvatarImage src={gamer.avatar?.url} />
                                        <AvatarFallback className="bg-purple-900/50 text-purple-400 font-bold">
                                            {gamer.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                                            {gamer.name}
                                        </h3>
                                        <p className="text-sm text-slate-400">@{gamer.username}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {gamer.esportsProfile?.games?.slice(0, 2).map((game, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs bg-purple-500/10 text-purple-300 border-0">
                                                    {game.gameTitle || game}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Badge className="bg-purple-600 text-white border-0">
                                        <Star className="w-3 h-3 mr-1" />
                                        #{i + 1}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

const GamersSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
            <Card key={i} className="border-slate-800 bg-black/20 overflow-hidden">
                <div className="h-20 bg-slate-800/50" />
                <CardContent className="pt-12 pb-4 space-y-3">
                    <Skeleton className="h-5 w-2/3 bg-slate-800" />
                    <Skeleton className="h-4 w-1/2 bg-slate-800" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 bg-slate-800" />
                        <Skeleton className="h-6 w-16 bg-slate-800" />
                    </div>
                    <Skeleton className="h-10 w-full bg-slate-800" />
                </CardContent>
            </Card>
        ))}
    </div>
);

const EmptyState = ({ onClear }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
        <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
            <Gamepad2 className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No gamers found</h3>
        <p className="text-slate-400 max-w-md mb-8">
            We couldn't find any gamers matching your criteria. Try adjusting your filters or search terms.
        </p>
        <Button onClick={onClear} variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
            <X className="w-4 h-4 mr-2" />
            Clear all filters
        </Button>
    </motion.div>
);

const Esports = () => {
    // Determine which context/hook to use. Assuming useEsports is mirrored from useAthletes
    const {
        gamers, // was athletes
        loading,
        getAllGamers, // was getAllAthletes
        toggleFollowGamer, // was toggleFollowAthlete
        filters,
        setFilters,
        pagination
    } = useEsports();

    const { user } = useAuth();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        getAllGamers();
    }, []);

    const handleSearch = (e) => {
        e?.preventDefault();
        getAllGamers({ ...filters, search: searchQuery });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        getAllGamers(newFilters);
    };

    const clearFilters = () => {
        setSearchQuery("");
        const defaultFilters = {
            search: '',
            game: 'all', // sport -> game
            rank: 'all', // skillLevel -> rank
            location: '',
            sortBy: 'joinedDate:desc'
        };
        setFilters(defaultFilters);
        getAllGamers(defaultFilters);
    };

    const hasActiveFilters = filters.game !== 'all' || filters.rank !== 'all' || searchQuery;

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30">
            {/* Hero Section */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

                <div className="container mx-auto px-4 py-12 lg:py-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                            <Users className="w-4 h-4" />
                            <span>Connect with {pagination?.total || (gamers || []).length}+ Gamers</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
                            Find Your Perfect{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Teammate</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Scout top tier talent, build your dream roster, and dominate the leaderboards. Connect with serious gamers in your region.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mt-8">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                                <Input
                                    placeholder="Search by gamertag, name, or location..."
                                    className="pl-12 h-12 text-base bg-black/40 border-white/10 text-white focus-visible:ring-purple-500 rounded-xl placeholder:text-slate-600"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                                />
                            </div>
                            <Button
                                size="lg"
                                className="h-12 px-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all"
                                onClick={handleSearch}
                            >
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className={cn(
                                    "h-12 px-4 rounded-xl border-white/10 bg-black/40 text-slate-300 hover:bg-white/5 hover:text-white",
                                    isFilterOpen && "bg-purple-500/10 border-purple-500/30 text-purple-300"
                                )}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Quick Game Filters */}
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {gameCategories.slice(1, 6).map((game) => (
                                <Button
                                    key={game.value}
                                    variant={filters.game === game.value ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                        "rounded-full border-white/10 bg-black/40",
                                        filters.game === game.value
                                            ? "bg-purple-600 text-white border-purple-500"
                                            : "text-slate-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10"
                                    )}
                                    onClick={() => handleFilterChange('game', game.value === filters.game ? 'all' : game.value)}
                                >
                                    {game.label}
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Filters Section */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-b border-white/10 bg-black/60 backdrop-blur-md overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-purple-400" />
                                    Advanced Filters
                                </h3>
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-slate-400 hover:text-red-400"
                                        onClick={clearFilters}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Clear All
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Game</label>
                                    <Select value={filters.game} onValueChange={(v) => handleFilterChange('game', v)}>
                                        <SelectTrigger className="w-full bg-black/40 border-white/10 text-white">
                                            <SelectValue placeholder="Select Game" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {gameCategories.map((game) => (
                                                <SelectItem key={game.value} value={game.value}>
                                                    {game.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Rank</label>
                                    <Select value={filters.rank} onValueChange={(v) => handleFilterChange('rank', v)}>
                                        <SelectTrigger className="w-full bg-black/40 border-white/10 text-white">
                                            <SelectValue placeholder="Select Rank" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            <SelectItem value="all">All Ranks</SelectItem>
                                            <SelectItem value="Iron">Iron</SelectItem>
                                            <SelectItem value="Bronze">Bronze</SelectItem>
                                            <SelectItem value="Silver">Silver</SelectItem>
                                            <SelectItem value="Gold">Gold</SelectItem>
                                            <SelectItem value="Platinum">Platinum</SelectItem>
                                            <SelectItem value="Diamond">Diamond</SelectItem>
                                            <SelectItem value="Ascendant">Ascendant</SelectItem>
                                            <SelectItem value="Immortal">Immortal</SelectItem>
                                            <SelectItem value="Radiant">Radiant</SelectItem>
                                            <SelectItem value="Challenger">Challenger</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Sort By</label>
                                    <Select value={filters.sortBy} onValueChange={(v) => handleFilterChange('sortBy', v)}>
                                        <SelectTrigger className="w-full bg-black/40 border-white/10 text-white">
                                            <SelectValue placeholder="Sort By" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            <SelectItem value="joinedDate:desc">Newest Members</SelectItem>
                                            <SelectItem value="rating:desc">Highest Rated</SelectItem>
                                            <SelectItem value="followers:desc">Most Popular</SelectItem>
                                            <SelectItem value="name:asc">Name (A-Z)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Location</label>
                                    <Input
                                        placeholder="Enter city or area..."
                                        value={filters.location || ''}
                                        onChange={(e) => handleFilterChange('location', e.target.value)}
                                        className="bg-black/40 border-white/10 text-white placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Featured Gamers */}
                {!loading && gamers && gamers.length > 0 && (
                    <FeaturedGamers
                        gamers={gamers}
                        currentUser={user}
                        onFollow={toggleFollowGamer}
                    />
                )}

                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            {hasActiveFilters ? 'Search Results' : 'All Gamers'}
                        </h2>
                        <p className="text-sm text-slate-400">
                            {loading ? 'Loading...' : `Showing ${(gamers || []).length} gamers`}
                        </p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2">
                        <Tabs value={viewMode} onValueChange={setViewMode}>
                            <TabsList className="bg-black/40 border border-white/10">
                                <TabsTrigger value="grid" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400">
                                    <Grid3X3 className="w-4 h-4" />
                                </TabsTrigger>
                                <TabsTrigger value="list" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400">
                                    <List className="w-4 h-4" />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>

                {/* Gamers Grid */}
                {loading ? (
                    <GamersSkeleton />
                ) : gamers && gamers.length > 0 ? (
                    <>
                        <motion.div
                            layout
                            className={cn(
                                "grid gap-6",
                                viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                    : "grid-cols-1 lg:grid-cols-2"
                            )}
                        >
                            <AnimatePresence>
                                {gamers.map((gamer, index) => (
                                    <motion.div
                                        key={gamer._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <GamerCard
                                            gamer={gamer}
                                            currentUser={user}
                                            isFollowing={user && gamer.followers?.includes(user.id)}
                                            onFollow={toggleFollowGamer}
                                            variant={viewMode}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Pagination Logic (if needed later) */}
                    </>
                ) : (
                    <EmptyState onClear={clearFilters} />
                )}
            </div>
        </div>
    );
};

export default Esports;
