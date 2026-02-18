import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Gamepad2 } from "lucide-react";
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
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Find Players</h1>
                    <p className="text-muted-foreground mt-2">Recruit top talent for your squad.</p>
                </div>

                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search by name, game, or role..."
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline" size="icon">
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
    );
};

export default EsportsPlayers;
