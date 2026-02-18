import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Swords, Crosshair, Zap, Activity } from "lucide-react";

const GameStats = ({ stats, games }) => {
    // Mock data if specific stats aren't available
    const gamePerformance = [
        { game: "Valorant", rank: "Ascendant 2", winRate: 58, kda: "1.42" },
        { game: "League of Legends", rank: "Platinum I", winRate: 52, kda: "3.1" },
        { game: "CS:GO 2", rank: "Global Elite", winRate: 64, kda: "1.28" }
    ];

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                    <Activity className="w-5 h-5" />
                    Game Stats
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {gamePerformance.map((game, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-foreground">{game.game}</span>
                            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                                {game.rank}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="flex flex-col gap-1 p-2 rounded bg-muted/30">
                                <span className="text-muted-foreground text-xs">Win Rate</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Trophy className="w-3 h-3 text-yellow-500" /> {game.winRate}%
                                </span>
                                <Progress value={game.winRate} className="h-1 bg-muted" />
                            </div>
                            <div className="flex flex-col gap-1 p-2 rounded bg-muted/30">
                                <span className="text-muted-foreground text-xs">K/D/A</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Crosshair className="w-3 h-3 text-red-400" /> {game.kda}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 p-2 rounded bg-muted/30">
                                <span className="text-muted-foreground text-xs">Matches</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Swords className="w-3 h-3 text-blue-400" /> {Math.floor(Math.random() * 200)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-2 flex gap-2">
                    <Badge className="bg-purple-900/30 text-purple-300 border-purple-500/30 hover:bg-purple-900/50">
                        <Zap className="w-3 h-3 mr-1 fill-purple-300" />
                        MVP x12
                    </Badge>
                    <Badge className="bg-red-900/30 text-red-300 border-red-500/30 hover:bg-red-900/50">
                        <Crosshair className="w-3 h-3 mr-1" />
                        Ace x5
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default GameStats;
