import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, MapPin } from "lucide-react";

const EsportsTournaments = () => {
    const tournaments = [
        {
            id: 1,
            title: "Valorant Community Cup",
            game: "Valorant",
            date: "Oct 15, 2024",
            prize: "$500",
            teams: "16/32",
            status: "Registration Open"
        },
        {
            id: 2,
            title: "CS2 Weekend Warfare",
            game: "CS2",
            date: "Oct 20, 2024",
            prize: "$250",
            teams: "8/16",
            status: "Upcoming"
        },
        {
            id: 3,
            title: "League of Legends Showdown",
            game: "League of Legends",
            date: "Oct 22, 2024",
            prize: "$1000",
            teams: "32/32",
            status: "Full"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Esports Tournaments</h1>
                    <p className="text-muted-foreground mt-2">Compete in top-tier community hosted tournaments.</p>
                </div>
                <Button>Create Tournament</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament) => (
                    <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="secondary">{tournament.game}</Badge>
                                <Badge variant={tournament.status === "Registration Open" ? "default" : "outline"}>
                                    {tournament.status}
                                </Badge>
                            </div>
                            <CardTitle className="mt-4">{tournament.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {tournament.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    Prize Pool: {tournament.prize}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Teams: {tournament.teams}
                                </div>
                            </div>
                            <Button className="w-full mt-6">View Details</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default EsportsTournaments;
