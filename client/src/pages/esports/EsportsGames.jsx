import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Users, ArrowRight } from "lucide-react";

const games = [
    { name: "Valorant", genre: "Tactical Shooter", players: "125k Active" },
    { name: "Counter-Strike 2", genre: "Tactical Shooter", players: "300k Active" },
    { name: "League of Legends", genre: "MOBA", players: "500k Active" },
    { name: "Dota 2", genre: "MOBA", players: "200k Active" },
    { name: "Apex Legends", genre: "Battle Royale", players: "150k Active" },
    { name: "Rocket League", genre: "Sports", players: "80k Active" },
];

const EsportsGames = () => {
    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className='fixed inset-0 z-0 pointer-events-none'>
                <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]' />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-3">
                        <Gamepad2 className="w-4 h-4" />
                        <span>Game Library</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-white">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Games</span>
                    </h1>
                    <p className="text-gray-400 mt-2 max-w-2xl text-lg">
                        Explore the most popular competitive titles on Nexus.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <Card key={game.name} className="group border-white/5 bg-white/5 hover:border-purple-500/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all duration-300 cursor-pointer backdrop-blur-sm">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-300">
                                    <Gamepad2 className="w-10 h-10 text-white group-hover:text-cyan-400 transition-colors" />
                                </div>
                                <h3 className="font-bold font-heading text-xl text-white mb-1 group-hover:text-cyan-400 transition-colors">{game.name}</h3>
                                <p className="text-sm text-gray-400 mb-6 font-medium">{game.genre}</p>

                                <div className="w-full mt-auto flex items-center justify-center gap-2 pt-4 border-t border-white/5">
                                    <Users className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm text-gray-300">{game.players}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EsportsGames;
