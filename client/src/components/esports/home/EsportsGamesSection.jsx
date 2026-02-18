import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, Users, Sparkles, Zap, Calendar, Gamepad2 } from 'lucide-react'

// Using generic icons or if available, specific game icons could be imported
// For now using LUCIDE icons as placeholders where appropriate or consistent styling
import { Monitor, Cpu, Crosshair, Sword } from 'lucide-react';

const EsportsGamesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState("all")

    const games = [
        {
            id: 'valorant',
            name: 'Valorant',
            icon: Crosshair,
            participants: '150k+',
            tournaments: '45+',
            description: '5v5 character-based tactical shooter',
        },
        {
            id: 'cs2',
            name: 'CS2',
            icon: Crosshair,
            participants: '300k+',
            tournaments: '120+',
            description: 'The premier competitive FPS',
        },
        {
            id: 'lol',
            name: 'League of Legends',
            icon: Sword,
            participants: '500k+',
            tournaments: '80+',
            description: 'Strategic MOBA action',
        },
        {
            id: 'rocket-league',
            name: 'Rocket League',
            icon: Zap,
            participants: '80k+',
            tournaments: '25+',
            description: 'Soccer meets driving',
        },
    ]

    return (
        <section className='py-24 bg-background border-t border-border relative overflow-hidden'>

            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
                    <div className='max-w-2xl'>
                        <div className='flex items-center gap-2 text-primary font-medium mb-4'>
                            <Sparkles className='w-4 h-4' />
                            <span className='text-sm uppercase tracking-wider'>Browse Games</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold font-heading text-foreground mb-4'>
                            Featured Esports Titles
                        </h2>
                        <p className='text-muted-foreground text-lg'>
                            Select your main game to find tournaments, teammates, and scrims.
                        </p>
                    </div>
                    <Link to='/esports/games' className='hidden md:flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group'>
                        View all games <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {games.map((game) => (
                        <Link
                            key={game.id}
                            to={`/esports/games`}
                            className='group block p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300'
                        >
                            <div className='flex justify-between items-start mb-6'>
                                < game.icon className='w-8 h-8 text-primary group-hover:text-primary/80 transition-colors' />
                                <div className='p-2 rounded-full bg-secondary border border-border group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300'>
                                    <ArrowRight className='w-4 h-4 text-muted-foreground group-hover:text-white' />
                                </div>
                            </div>

                            <h3 className='text-xl font-bold font-heading text-foreground mb-2 group-hover:text-primary transition-colors'>
                                {game.name}
                            </h3>
                            <p className='text-sm text-muted-foreground mb-6 line-clamp-2'>
                                {game.description}
                            </p>

                            <div className='flex items-center gap-4 pt-4 border-t border-border'>
                                <div className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
                                    <Users className='w-3.5 h-3.5' />
                                    {game.participants}
                                </div>
                                <div className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground'>
                                    <Trophy className='w-3.5 h-3.5' />
                                    {game.tournaments}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className='mt-12 p-8 rounded-2xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-colors'>
                    <div className='absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none' />

                    <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
                        <div className='flex items-center gap-6'>
                            <div className='w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors'>
                                <Gamepad2 className='w-7 h-7 text-primary' />
                            </div>
                            <div>
                                <h3 className='text-xl font-bold font-heading text-foreground mb-1'>Game missing?</h3>
                                <p className='text-muted-foreground'>Suggest a new competitive title to be added to Playmeet.</p>
                            </div>
                        </div>
                        <Link to='/contact'>
                            <button className='px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5'>
                                Suggest Game
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EsportsGamesSection
