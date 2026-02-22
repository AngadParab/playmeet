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
import { Trophy, Medal, Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";


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
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className='fixed inset-0 z-0 pointer-events-none'>
                <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]' />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-3">
                            <Trophy className="w-4 h-4" />
                            <span>Global Rankings</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-white">
                            Leader<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">board</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl text-lg">
                            Top performing players across all supported titles.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                                placeholder="Search player..."
                                className="pl-9 bg-white/5 border-white/10 text-white focus:border-purple-500 w-64"
                            />
                        </div>
                        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                            <Button
                                variant="ghost"
                                onClick={() => setPeriod("weekly")}
                                size="sm"
                                className={period === "weekly" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"}
                            >
                                Weekly
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => setPeriod("alltime")}
                                size="sm"
                                className={period === "alltime" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"}
                            >
                                All Time
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40 backdrop-blur-md shadow-2xl shadow-purple-900/10">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/5 hover:bg-white/5">
                                <TableHead className="w-[100px] text-gray-400 font-bold">Rank</TableHead>
                                <TableHead className="text-gray-400 font-bold">Player</TableHead>
                                <TableHead className="hidden md:table-cell text-gray-400 font-bold">Main Game</TableHead>
                                <TableHead className="text-right text-gray-400 font-bold">Win Rate</TableHead>
                                <TableHead className="text-right text-gray-400 font-bold">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaders.map((player) => (
                                <TableRow key={player.rank} className="border-white/5 hover:bg-white/5 transition-colors group">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            {player.rank === 1 && <div className="p-1.5 rounded-full bg-yellow-500/20"><Trophy className="w-5 h-5 text-yellow-400" /></div>}
                                            {player.rank === 2 && <div className="p-1.5 rounded-full bg-gray-400/20"><Medal className="w-5 h-5 text-gray-300" /></div>}
                                            {player.rank === 3 && <div className="p-1.5 rounded-full bg-amber-700/20"><Medal className="w-5 h-5 text-amber-600" /></div>}
                                            {player.rank > 3 && <span className="ml-3 text-gray-500 font-bold">#{player.rank}</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-white/10 group-hover:border-purple-500/50 transition-colors">
                                                <AvatarFallback className="bg-purple-900/50 text-purple-200">{player.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">{player.name}</span>
                                                <span className="text-xs text-gray-500">{player.team}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge variant="secondary" className="bg-white/5 text-gray-300 hover:bg-white/10 border-white/5">
                                            {player.main}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-gray-300 font-medium">{player.winRate}</TableCell>
                                    <TableCell className="text-right">
                                        <span className="text-purple-400 font-bold font-mono text-lg">{player.score}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default EsportsLeaderboard;
