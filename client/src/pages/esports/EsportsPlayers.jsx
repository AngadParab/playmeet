import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Users, Sparkles } from "lucide-react";
import GamerCard from "@/components/esports/GamerCard";

const EsportsPlayers = () => {
    // Mock Data (mirrored from Athletes.jsx/Esports.jsx)
    const gamers = [
        {
            _id: '1',
            name: "ViperMain",
            role: "Controller",
            location: "Mumbai, India",
            avatar: { url: null },
            stats: { rating: 4.8 },
            gameInfo: {
                title: "Valorant",
                rank: "Ascendant 2",
                kd: "1.24",
                winRate: "58%"
            },
            isOnline: true
        },
        {
            _id: '2',
            name: "AWP_God",
            role: "Sniper",
            location: "Bangalore, India",
            avatar: { url: null },
            stats: { rating: 4.5 },
            gameInfo: {
                title: "CS2",
                rank: "Global Elite",
                kd: "1.5",
                winRate: "62%"
            },
            isOnline: false
        },
        {
            _id: '3',
            name: "JungleDiff",
            role: "Jungler",
            location: "Delhi, India",
            avatar: { url: null },
            stats: { rating: 4.2 },
            gameInfo: {
                title: "League of Legends",
                rank: "Diamond I",
                kd: "3.2 KDA",
                winRate: "55%"
            },
            isOnline: true
        }
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className='fixed inset-0 z-0 pointer-events-none'>
                <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]' />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-3">
                            <Users className="w-4 h-4" />
                            <span>Player Database</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-white">
                            Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Players</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl text-lg">
                            Recruit top talent for your squad or find your next scrim partner.
                        </p>
                    </div>

                    <div className="flex w-full md:w-auto gap-3">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                                placeholder="Search by name, game, or role..."
                                className="pl-10 h-10 bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 rounded-lg placeholder:text-gray-600"
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {gamers.map((gamer) => (
                        <div key={gamer._id} className="h-full">
                            <GamerCard athlete={gamer} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EsportsPlayers;
