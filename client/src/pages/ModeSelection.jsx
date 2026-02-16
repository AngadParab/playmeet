import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Gamepad2, ArrowRight } from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ModeSelection = () => {
    const { selectMode } = useMode();
    const navigate = useNavigate();
    const [hoveredMode, setHoveredMode] = useState(null);

    const handleModeSelect = (mode) => {
        selectMode(mode);
        if (mode === 'athletes') {
            navigate('/dashboard'); // Or '/athletes' base route
        } else {
            navigate('/esports/tournaments'); // Or '/esports' base route
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark mb-4">
                        Choose Your Arena
                    </h1>
                    <p className="text-xl text-muted-foreground-light dark:text-muted-foreground-dark">
                        Select your preferred mode for this session
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Physical Sports Option */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setHoveredMode('athletes')}
                        onHoverEnd={() => setHoveredMode(null)}
                    >
                        <Card
                            className={`h-full cursor-pointer transition-all duration-300 border-2 ${hoveredMode === 'athletes'
                                    ? 'border-green-500 shadow-xl shadow-green-500/20'
                                    : 'border-transparent hover:border-border-light dark:hover:border-border-dark'
                                }`}
                            onClick={() => handleModeSelect('athletes')}
                        >
                            <CardContent className="p-8 md:p-12 flex flex-col items-center text-center h-full justify-between space-y-8">
                                <div className="space-y-6">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 ${hoveredMode === 'athletes' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-secondary/10'
                                        }`}>
                                        <Trophy className={`w-12 h-12 ${hoveredMode === 'athletes' ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                                            }`} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-3">Athletes Mode</h2>
                                        <p className="text-muted-foreground text-lg">
                                            Join physical sports events, find local teammates, and climb the athletic leaderboard.
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full space-y-4">
                                    <ul className="text-left space-y-2 text-sm text-muted-foreground mx-auto max-w-xs">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                                            Physical Events & Meetups
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                                            Local Venue Booking
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                                            Team Management
                                        </li>
                                    </ul>
                                    <Button
                                        className={`w-full text-lg h-12 ${hoveredMode === 'athletes'
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-secondary text-secondary-foreground'
                                            }`}
                                    >
                                        Enter Arena <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Esports Option */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setHoveredMode('esports')}
                        onHoverEnd={() => setHoveredMode(null)}
                    >
                        <Card
                            className={`h-full cursor-pointer transition-all duration-300 border-2 ${hoveredMode === 'esports'
                                    ? 'border-purple-500 shadow-xl shadow-purple-500/20'
                                    : 'border-transparent hover:border-border-light dark:hover:border-border-dark'
                                }`}
                            onClick={() => handleModeSelect('esports')}
                        >
                            <CardContent className="p-8 md:p-12 flex flex-col items-center text-center h-full justify-between space-y-8">
                                <div className="space-y-6">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 ${hoveredMode === 'esports' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-secondary/10'
                                        }`}>
                                        <Gamepad2 className={`w-12 h-12 ${hoveredMode === 'esports' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'
                                            }`} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-3">Esports Mode</h2>
                                        <p className="text-muted-foreground text-lg">
                                            Compete in online tournaments, manage gaming profiles, and connect with other gamers.
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full space-y-4">
                                    <ul className="text-left space-y-2 text-sm text-muted-foreground mx-auto max-w-xs">
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                            Online Tournaments
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                            Game Profiles & Stats
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />
                                            Match Chat & Lobbies
                                        </li>
                                    </ul>
                                    <Button
                                        className={`w-full text-lg h-12 ${hoveredMode === 'esports'
                                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                                : 'bg-secondary text-secondary-foreground'
                                            }`}
                                    >
                                        Enter Nexus <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ModeSelection;
