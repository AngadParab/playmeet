import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Monitor, Shield, Zap } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useAuth } from '@/hooks/useAuth';

const TournamentCard = ({ tournament, onJoin }) => {
    const { user } = useAuth();
    const isLive = tournament.status === "Ongoing";

    // Safely check if the currently logged-in user is a participant
    const isParticipant = user ? tournament.participants?.some(p =>
        (typeof p.user === 'string' ? p.user : p.user?._id) === user._id
    ) : false;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden border-purple-500/30 bg-black/40 backdrop-blur-md hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500 group">
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <img
                        src={tournament.images?.[0]?.url || `https://source.unsplash.com/random/800x600?${tournament.gameTitle}`}
                        alt={tournament.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Live Badge */}
                    {isLive && (
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full animate-pulse border border-red-400/50">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Live Now</span>
                        </div>
                    )}

                    <div className="absolute bottom-4 left-4 z-20">
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 bg-cyan-950/30 backdrop-blur-md mb-2">
                            {tournament.platform} • {tournament.region}
                        </Badge>
                        <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition-colors">
                            {tournament.name}
                        </h3>
                    </div>
                </div>

                <CardContent className="p-5 space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-gray-300">
                            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                <Trophy className="w-4 h-4 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Prize Pool</p>
                                <p className="font-bold text-lg text-purple-300">{tournament.prizePool}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                <Users className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Teams</p>
                                <p className="font-bold text-lg text-cyan-300">
                                    {tournament.participants?.length || 0}<span className="text-gray-500 text-sm">/{tournament.maxParticipants}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4" />

                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Shield className="w-4 h-4" />
                            <span>{tournament.bracketType}</span>
                        </div>
                    </div>

                    {/* Button Logic */}
                    {isParticipant ? (
                        <Button
                            onClick={() => onJoin(tournament)} // Reuse handler, but it will navigate
                            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold tracking-wide border-0 shadow-lg"
                        >
                            <Zap className="w-4 h-4 mr-2" />
                            Go to Lobby
                        </Button>
                    ) : (
                        <Button
                            onClick={() => onJoin(tournament)}
                            disabled={tournament.status === "Registration Closed" || tournament.status === "Completed" || tournament.participants.length >= tournament.maxParticipants}
                            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold tracking-wide border-0 shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Zap className="w-4 h-4 mr-2" />
                            {tournament.status === "Registration Closed" ? "Registration Closed" :
                                tournament.participants.length >= tournament.maxParticipants ? "Tournament Full" : "Join Tournament"}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TournamentCard;
