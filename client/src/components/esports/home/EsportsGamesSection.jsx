import { Link } from 'react-router-dom';
import { Crosshair, Trophy, Users, ArrowRight, Sword, Gamepad2 } from 'lucide-react';

const EsportsGamesSection = () => {
    const games = [
        { id: 'valorant', name: 'Valorant', icon: Crosshair, participants: '150k+', tournaments: '45+', description: '5v5 character-based tactical shooter' },
        { id: 'cs2', name: 'CS2', icon: Crosshair, participants: '120k+', tournaments: '30+', description: 'The premier tactical shooter' },
        { id: 'lol', name: 'League of Legends', icon: Sword, participants: '200k+', tournaments: '60+', description: 'Multiplayer online battle arena' },
        { id: 'dota2', name: 'Dota 2', icon: Sword, participants: '80k+', tournaments: '25+', description: 'Deepest strategy RTS' },
        { id: 'rocket-league', name: 'Rocket League', icon: Gamepad2, participants: '90k+', tournaments: '40+', description: 'Soccer with rocket-powered cars' },
        { id: 'overwatch2', name: 'Overwatch 2', icon: Users, participants: '110k+', tournaments: '35+', description: 'Team-based hero shooter' },
    ];

    return (
        <section className='py-24 bg-[#09090b] relative overflow-hidden'>
            {/* Background Elements */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/5 to-transparent pointer-events-none" />

            <div className='container mx-auto px-4 relative z-10'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
                            <Gamepad2 className="w-4 h-4" />
                            <span>Supported Titles</span>
                        </div>
                        <h2 className='text-3xl md:text-5xl font-bold font-heading text-white'>
                            Featured <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400'>Esports Titles</span>
                        </h2>
                    </div>
                    <Link to='/esports/games' className='group flex items-center text-purple-400 hover:text-purple-300 font-semibold transition-colors'>
                        View All Games
                        <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                    </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {games.map((game, index) => (
                        <Link to={`/esports/games`} key={index} className='group'>
                            <div className='h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(147,51,234,0.1)] transition-all duration-300'>
                                <div className='flex items-start justify-between mb-6'>
                                    <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                        <game.icon className='w-8 h-8 text-white group-hover:text-cyan-400 transition-colors' />
                                    </div>
                                    <span className='px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/5 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors'>
                                        {game.tournaments} Tournaments
                                    </span>
                                </div>

                                <h3 className='text-xl font-bold font-heading text-white mb-2 group-hover:text-cyan-400 transition-colors'>
                                    {game.name}
                                </h3>

                                <p className='text-gray-400 text-sm mb-6 line-clamp-2'>
                                    {game.description}
                                </p>

                                <div className='pt-6 border-t border-white/5 flex items-center justify-between text-sm text-gray-500'>
                                    <div className='flex items-center gap-2'>
                                        <Users className='w-4 h-4' />
                                        <span>{game.participants} Active</span>
                                    </div>
                                    <ArrowRight className='w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-400' />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EsportsGamesSection;
