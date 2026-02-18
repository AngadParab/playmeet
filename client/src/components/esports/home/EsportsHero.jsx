import { Link } from 'react-router-dom'
import {
    Gamepad2,
    Trophy,
    Users,
    Zap,
    Star,
    MonitorPlay
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const EsportsHero = () => {
    return (
        <section className='relative min-h-[90vh] flex flex-col justify-center overflow-hidden pb-12 bg-background'>
            {/* Background Grid - keeping it subtle like the physical mode but with a tech vibe if needed, 
              but for now just using cleaner background to match physical mode exactly */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            <div className='container mx-auto px-4 relative z-10'>
                <div className='flex flex-col items-center text-center max-w-4xl mx-auto space-y-8'>

                    {/* Badge */}
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur-sm border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500'>
                        <span className='relative flex h-2 w-2'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
                        </span>
                        <span className='text-sm font-medium text-muted-foreground'>
                            The Future of Competitive Gaming is Here
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100'>
                        Find Your Dream <br />
                        <span className='text-primary'>Esports Team</span>
                    </h1>

                    {/* Description */}
                    <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200'>
                        Connect with top-tier talent, join competitive scrims, and dominate the leaderboards in the world's fastest growing esports community.
                    </p>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300'>
                        <Link to='/esports/players'>
                            <Button size="lg" className='h-12 px-8 rounded-full text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300'>
                                <Users className='w-5 h-5 mr-2' />
                                Find Teammates
                            </Button>
                        </Link>
                        <Link to='/esports/tournaments'>
                            <Button variant="outline" size="lg" className='h-12 px-8 rounded-full text-base border-2 hover:bg-secondary/80'>
                                <Trophy className='w-5 h-5 mr-2' />
                                Join Tournaments
                            </Button>
                        </Link>
                    </div>

                    {/* Trust/Social Proof */}
                    <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                                    <MonitorPlay className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span className="font-medium text-foreground">Active Lobbies</span>
                            <span>in 5+ Regions</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default EsportsHero
