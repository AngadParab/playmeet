import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Trophy, Play, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const EsportsHero = () => {
    return (
        <section className='relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#09090b]'>
            {/* Background Effects */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse' />
                <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]' />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className='container relative z-10 px-4 pt-20 text-center'>
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm'
                >
                    <span className='relative flex h-2 w-2'>
                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
                        <span className='relative inline-flex rounded-full h-2 w-2 bg-cyan-500'></span>
                    </span>
                    <span className='text-sm font-medium text-purple-300 tracking-wide uppercase'>The Nexus of Competitive Gaming</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight text-white mb-6'
                >
                    Find Your Dream <br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 animate-gradient-x'>Esports Team</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed'
                >
                    Join the ultimate platform for competitive gamers. Recruit players, find scrims,
                    compete in tournaments, and climb the leaderboards to glory.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className='flex flex-col sm:flex-row items-center justify-center gap-4'
                >
                    <Link to='/esports/players'>
                        <Button size="lg" className='h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white border-0 shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:scale-105'>
                            <Users className='w-5 h-5 mr-2' />
                            Find Teammates
                        </Button>
                    </Link>
                    <Link to='/esports/tournaments'>
                        <Button size="lg" variant="outline" className='h-14 px-8 text-lg border-purple-500/30 bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 hover:text-white hover:border-purple-500/50 backdrop-blur-sm'>
                            <Trophy className='w-5 h-5 mr-2' />
                            Join Tournaments
                        </Button>
                    </Link>
                </motion.div>

                {/* Social Proof / Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className='mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8'
                >
                    {[
                        { label: 'Active Teams', value: '2.5K+', icon: Users },
                        { label: 'Tournaments', value: '150+', icon: Trophy },
                        { label: 'Matches Played', value: '12K+', icon: Play },
                        { label: 'Pro Scrims', value: 'Daily', icon: Zap },
                    ].map((stat, index) => (
                        <div key={index} className='text-center group'>
                            <div className='flex justify-center mb-3 text-purple-500 group-hover:text-cyan-400 transition-colors duration-300'>
                                <stat.icon className='w-6 h-6' />
                            </div>
                            <div className='text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300'>{stat.value}</div>
                            <div className='text-sm text-gray-500 font-medium tracking-wider uppercase'>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default EsportsHero;
