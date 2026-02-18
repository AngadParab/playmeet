import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Calendar,
    Trophy,
    Users,
    Star,
    Activity,
    MapPin
} from 'lucide-react';

const EsportsFeaturedTournaments = () => {
    // Mock data for now, ideally fetched from API
    const tournaments = [
        {
            id: 1,
            name: "Valorant Community Cup",
            game: "Valorant",
            date: "Oct 15, 2024",
            prize: "$500",
            teams: "16/32",
            status: "Registration Open",
            participants: 16, // teams
            image: null // placeholder
        },
        {
            id: 2,
            name: "CS2 Weekend Warfare",
            game: "CS2",
            date: "Oct 20, 2024",
            prize: "$250",
            teams: "8/16",
            status: "Upcoming",
            participants: 8,
            image: null
        },
        {
            id: 3,
            name: "League of Legends Showdown",
            game: "League of Legends",
            date: "Oct 22, 2024",
            prize: "$1000",
            teams: "32/32",
            status: "Full",
            participants: 32,
            image: null
        }
    ];

    return (
        <section className='py-24 bg-background border-t border-border z-10'>

            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
                    <div className='max-w-2xl'>
                        <div className='flex items-center gap-2 text-primary font-medium mb-4'>
                            <Activity className='w-4 h-4' />
                            <span className='text-sm uppercase tracking-wider'>Live Action</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold font-heading text-foreground mb-4'>
                            Featured Tournaments
                        </h2>
                        <p className='text-muted-foreground text-lg'>
                            Join high-stakes tournaments and prove your skills on the big stage.
                        </p>
                    </div>
                    <Link to='/esports/tournaments' className='hidden md:flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group'>
                        View all tournaments <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </Link>
                </div>

                {tournaments.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {tournaments.map((tournament) => (
                            <Link
                                key={tournament.id}
                                to={`/esports/tournaments`}
                                className='group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300'
                            >
                                <div className='relative h-52 overflow-hidden bg-secondary'>
                                    <div className='w-full h-full flex items-center justify-center text-muted-foreground bg-primary/5'>
                                        <Trophy className='w-12 h-12 opacity-20' />
                                    </div>
                                    <div className='absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md text-xs font-bold text-foreground border border-border shadow-sm'>
                                        {tournament.game}
                                    </div>
                                </div>

                                <div className='p-6 flex-1 flex flex-col'>
                                    <div className='flex items-center gap-2 text-xs font-bold text-primary mb-3 uppercase tracking-wide'>
                                        <Calendar className='w-3.5 h-3.5' />
                                        {tournament.date}
                                    </div>

                                    <h3 className='text-xl font-bold font-heading text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors'>
                                        {tournament.name}
                                    </h3>

                                    <div className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
                                        <Trophy className='w-4 h-4 text-yellow-500' />
                                        <span className='truncate font-medium text-foreground'>Prize: {tournament.prize}</span>
                                    </div>

                                    <div className='mt-auto pt-6 border-t border-border flex items-center justify-between'>
                                        <div className='flex items-center gap-2 text-sm text-muted-foreground font-medium'>
                                            <Users className='w-4 h-4' />
                                            <span>{tournament.participants} Teams</span>
                                        </div>
                                        <div className='flex items-center gap-1 text-sm font-bold text-foreground bg-secondary/50 px-2 py-1 rounded-md'>
                                            <div className={`w-2 h-2 rounded-full ${tournament.status === 'Registration Open' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            {tournament.status}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-24 bg-card rounded-2xl border border-border'>
                        <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center'>
                            <Trophy className='w-8 h-8 text-muted-foreground' />
                        </div>
                        <h3 className='text-xl font-bold text-foreground mb-2'>No tournaments found</h3>
                        <p className='text-muted-foreground mb-8'>Check back later for upcoming competitive events.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default EsportsFeaturedTournaments
