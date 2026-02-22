import { Link } from 'react-router-dom';
import { Calendar, Trophy, Users, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EsportsFeaturedTournaments = () => {
    const tournaments = [
        { id: 1, name: "Valorant Community Cup", game: "Valorant", date: "Oct 15, 2024", prize: "$500", teams: "16/32", status: "Registration Open", participants: 16, image: "/assets/esports/valorant.jpg" },
        { id: 2, name: "CS2 Weekend Warfare", game: "CS2", date: "Oct 20, 2024", prize: "$250", teams: "8/16", status: "Upcoming", participants: 8, image: "/assets/esports/Counter strike 2.jpg" },
        { id: 3, name: "League of Legends Showdown", game: "League of Legends", date: "Oct 22, 2024", prize: "$1000", teams: "32/32", status: "Full", participants: 32, image: "/assets/esports/Legue Of Legends.jpg" },
        { id: 4, name: "Rocket League Rumble", game: "Rocket League", date: "Oct 25, 2024", prize: "$300", teams: "10/16", status: "Registration Open", participants: 10, image: "/assets/esports/Rocket Legue.avif" },
    ];

    return (
        <section className='py-24 bg-[#09090b] relative border-y border-white/5'>

            <div className='container mx-auto px-4 relative z-10'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                            <Trophy className="w-4 h-4" />
                            <span>Competitive Scene</span>
                        </div>
                        <h2 className='text-3xl md:text-5xl font-bold font-heading text-white'>
                            Featured <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400'>Tournaments</span>
                        </h2>
                    </div>
                    <Link to='/esports/tournaments'>
                        <Button variant="outline" className='border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:text-white hover:border-purple-500/50'>
                            View All Tournaments
                        </Button>
                    </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {tournaments.map((tournament) => (
                        <div key={tournament.id} className='group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300'>
                            <div className="relative h-48 p-4 flex flex-col justify-between group-hover:h-52 transition-all duration-300">
                                <div className="absolute inset-0">
                                    <img
                                        src={tournament.image}
                                        alt={tournament.game}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent opacity-90"></div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <Badge variant="secondary" className="bg-black/40 backdrop-blur-md text-white border border-white/10">
                                        {tournament.game}
                                    </Badge>
                                    <Badge className={`${tournament.status === 'Registration Open'
                                        ? 'bg-green-500/20 text-green-300 border-green-500/30'
                                        : tournament.status === 'Full'
                                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                        } border backdrop-blur-md`}>
                                        {tournament.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className='p-5 space-y-4'>
                                <h3 className='text-lg font-bold font-heading text-white line-clamp-1 group-hover:text-cyan-400 transition-colors'>
                                    {tournament.name}
                                </h3>

                                <div className='space-y-2 text-sm text-gray-400'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Calendar className='w-4 h-4' />
                                            <span>{tournament.date}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Trophy className='w-4 h-4 text-purple-400' />
                                            <span className="text-purple-300 font-medium">{tournament.prize}</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Users className='w-4 h-4' />
                                            <span>{tournament.teams}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link to={`/esports/tournaments`}>
                                    <Button className='w-full mt-2 bg-white/5 hover:bg-cyan-500/20 text-white hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-all'>
                                        View Details
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EsportsFeaturedTournaments;
