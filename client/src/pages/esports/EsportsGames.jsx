import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

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
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Featured Games</h1>
                <p className="text-muted-foreground mt-2">Explore the most popular competitive titles on Playmeet.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map((game) => (
                    <Card key={game.name} className="group hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Gamepad2 className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{game.genre}</p>
                            <Badge variant="outline" className="mt-auto">
                                {game.players}
                            </Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

import { Badge } from "@/components/ui/badge";

export default EsportsGames;
