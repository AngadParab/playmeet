import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Search,
    Menu,
    X,
    User,
    LogOut,
    Settings,
    Trophy,
    Gamepad2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMode } from '@/context/ModeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const EsportsHeader = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, logout } = useAuth();
    const { switchMode } = useMode();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleModeSwitch = () => {
        switchMode(null); // Go to mode selection
        navigate('/mode-selection');
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/40">
            <div className="flex h-16 items-center px-4 gap-4">
                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-slate-400 hover:text-white hover:bg-white/10"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Logo / Title */}
                <div className="hidden md:flex items-center gap-2 mr-4">
                    <Link to="/esports" className="flex items-center gap-2">
                        <div className="bg-purple-600 p-1.5 rounded-lg">
                            <Gamepad2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight">PLAYMEET <span className="text-purple-400">ESPORTS</span></span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-auto hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search tournaments, gamers, teams..."
                            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-purple-500 rounded-full h-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 ml-auto">
                    {/* Mode Switcher */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleModeSwitch}
                        className="hidden md:flex text-slate-400 hover:text-white hover:bg-white/10 gap-2"
                    >
                        <Trophy className="h-4 w-4" />
                        <span>Switch Mode</span>
                    </Button>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10 relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-purple-500 ring-2 ring-black" />
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1 ring-2 ring-purple-600/30 hover:ring-purple-500 transition-all p-0 overflow-hidden">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user?.avatar?.url} alt={user?.name} />
                                    <AvatarFallback className="bg-purple-900 text-purple-200">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800 text-zinc-100" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">{user?.name}</p>
                                    <p className="text-xs leading-none text-zinc-400">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer" onClick={() => navigate('/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer" onClick={() => navigate('/settings')}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-950/20 cursor-pointer" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default EsportsHeader;
