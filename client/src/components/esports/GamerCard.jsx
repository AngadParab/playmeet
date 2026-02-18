import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Gamepad2,
    UserPlus,
    UserCheck,
    Star,
    Users,
    Trophy,
    ChevronRight,
    Loader2,
    Swords,
    Crosshair
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const GamerCard = ({ athlete, onFollow, isFollowing: initialIsFollowing, currentUser, variant = "grid" }) => {
    // Note: 'athlete' prop is used for the user object to maintain compatibility with existing data structures
    // but semantically represents a 'gamer' in this context.
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isLoading, setIsLoading] = useState(false);

    const handleFollow = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) {
            toast.error('Please login to follow gamers');
            return;
        }

        setIsLoading(true);
        const wasFollowing = isFollowing;
        setIsFollowing(!wasFollowing);

        try {
            await onFollow(athlete._id);
            toast.success(wasFollowing ? `Unfollowed ${athlete.name}` : `Following ${athlete.name}`);
        } catch (error) {
            setIsFollowing(wasFollowing);
            toast.error('Failed to update follow status');
        } finally {
            setIsLoading(false);
        }
    };

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
    };

    // Grid variant (default)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group h-full"
        >
            <Card className="overflow-hidden border-border bg-card/50 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(176,38,255,0.15)] transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                {/* Header Banner - Neon Purple Gradient */}
                <div className="h-20 bg-gradient-to-br from-primary/80 to-purple-900/80 relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

                    {/* Avatar */}
                    <div className="absolute -bottom-8 left-4">
                        <Link to={`/profile/${athlete._id}`}>
                            <div className="relative">
                                <Avatar className="w-16 h-16 border-4 border-card shadow-lg ring-2 ring-primary/20">
                                    <AvatarImage src={athlete.avatar?.url} alt={athlete.name} className="object-cover" />
                                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-lg border border-primary/30">
                                        {getInitials(athlete.name)}
                                    </AvatarFallback>
                                </Avatar>
                                {athlete.isOnline && (
                                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                )}
                            </div>
                        </Link>
                    </div>

                    {/* Rank/Rating Badge */}
                    {athlete.stats?.rating > 0 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold text-white">
                                {athlete.stats.rating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <CardContent className="pt-10 pb-4 px-4 flex-grow space-y-3">
                    {/* Name & Username */}
                    <div>
                        <Link to={`/profile/${athlete._id}`}>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate text-lg">
                                {athlete.name}
                            </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">@{athlete.username}</p>
                    </div>

                    {/* Bio */}
                    {athlete.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                            {athlete.bio}
                        </p>
                    )}

                    {/* Game Titles Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {athlete.sportsPreferences?.slice(0, 3).map((pref, idx) => (
                            <Badge
                                key={idx}
                                variant="secondary"
                                className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-xs"
                            >
                                <Gamepad2 className="w-3 h-3 mr-1" />
                                {pref.sport}
                            </Badge>
                        ))}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-t border-border/50">
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/30">
                            <Swords className="w-4 h-4 text-primary mb-1" />
                            <span className="text-xs font-semibold">{athlete.stats?.eventsParticipated || 0}</span>
                            <span className="text-[10px] text-muted-foreground">Matches</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/30">
                            <Crosshair className="w-4 h-4 text-green-500 mb-1" />
                            <span className="text-xs font-semibold">{(Math.random() * 2 + 1).toFixed(2)}</span>
                            <span className="text-[10px] text-muted-foreground">K/D</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/30">
                            <Trophy className="w-4 h-4 text-yellow-500 mb-1" />
                            <span className="text-xs font-semibold">{athlete.stats?.wins || Math.floor(Math.random() * 50)}</span>
                            <span className="text-[10px] text-muted-foreground">Wins</span>
                        </div>
                    </div>
                </CardContent>

                {/* Footer Actions */}
                <CardFooter className="px-4 py-3 bg-muted/20 border-t border-border/50 flex gap-2">
                    <Link to={`/profile/${athlete._id}`} className="flex-1">
                        <Button
                            variant="secondary"
                            className="w-full h-9 text-sm bg-muted/50 hover:bg-muted border-0 text-muted-foreground hover:text-foreground"
                        >
                            View Profile
                        </Button>
                    </Link>
                    {currentUser && currentUser.id !== athlete._id && (
                        <Button
                            size="sm"
                            onClick={handleFollow}
                            disabled={isLoading}
                            className={cn(
                                "h-9 px-3 transition-all",
                                isFollowing
                                    ? "bg-muted text-foreground hover:bg-destructive/10 hover:text-destructive"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isFollowing ? (
                                <UserCheck className="w-4 h-4" />
                            ) : (
                                <UserPlus className="w-4 h-4" />
                            )}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default GamerCard;
