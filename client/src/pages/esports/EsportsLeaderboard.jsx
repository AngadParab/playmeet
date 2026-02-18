import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Star } from "lucide-react";

const EsportsLeaderboard = () => {
    const [period, setPeriod] = useState("weekly");

    const leaders = [
        { rank: 1, name: "Demon1", team: "NRG", score: 2450, winRate: "68%", main: "Valorant" },
        { rank: 2, name: "s1mple", team: "Falcons", score: 2380, winRate: "65%", main: "CS2" },
        { rank: 3, name: "Faker", team: "T1", score: 2350, winRate: "70%", main: "LoL" },
        { rank: 4, name: "TenZ", team: "Sentinels", score: 2100, winRate: "62%", main: "Valorant" },
        { rank: 5, name: "ZywOo", team: "Vitality", score: 2050, winRate: "64%", main: "CS2" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Global Leaderboard</h1>
                    <p className="text-muted-foreground mt-2">Top performing players across all supported titles.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={period === "weekly" ? "default" : "outline"}
                        onClick={() => setPeriod("weekly")}
                        size="sm"
                    >
                        Weekly
                    </Button>
                    <Button
                        variant={period === "alltime" ? "default" : "outline"}
                        onClick={() => setPeriod("alltime")}
                        size="sm"
                    >
                        All Time
                    </Button>
                </div>
            </div>

            <div className="rounded-md border border-border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Rank</TableHead>
                            <TableHead>Player</TableHead>
                            <TableHead className="hidden md:table-cell">Main Game</TableHead>
                            <TableHead className="text-right">Win Rate</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaders.map((player) => (
                            <TableRow key={player.rank}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        {player.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
                                        {player.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                                        {player.rank === 3 && <Medal className="w-5 h-5 text-amber-700" />}
                                        <span className="ml-1">#{player.rank}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{player.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{player.name}</span>
                                            <span className="text-xs text-muted-foreground">{player.team}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge variant="secondary">{player.main}</Badge>
                                </TableCell>
                                <TableCell className="text-right">{player.winRate}</TableCell>
                                <TableCell className="text-right font-bold text-primary">{player.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default EsportsLeaderboard;
