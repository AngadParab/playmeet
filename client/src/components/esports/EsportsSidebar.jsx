import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    Trophy,
    Users,
    Gamepad2,
    Shield,
    MessageSquare,
    LayoutDashboard,
    LogOut,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const sidebarItems = [
    { icon: Home, label: 'Lobby', href: '/esports', exact: true },
    { icon: Trophy, label: 'Tournaments', href: '/esports/tournaments' },
    { icon: Users, label: 'Gamers', href: '/esports/gamers' },
    { icon: Shield, label: 'Scrims', href: '/esports/scrims' }, // Coming Soon
    { icon: Gamepad2, label: 'My Teams', href: '/esports/teams' }, // Coming Soon
    //   { icon: MessageSquare, label: 'Community', href: '/esports/community' },
];

const SidebarItem = ({ item, isActive, onClick }) => (
    <Link
        to={item.href}
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
            isActive
                ? "bg-purple-600/10 text-purple-400"
                : "text-slate-400 hover:text-white hover:bg-white/5"
        )}
    >
        {isActive && (
            <motion.div
                layoutId="activeSidebarItem"
                className="absolute inset-0 bg-purple-600/10 border-r-2 border-purple-500"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
        <item.icon className={cn("h-5 w-5 z-10 relative", isActive ? "text-purple-400" : "group-hover:text-purple-300")} />
        <span className="font-medium z-10 relative">{item.label}</span>
    </Link>
);

const EsportsSidebar = ({ open, onClose }) => {
    const location = useLocation();

    return (
        <>
            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-64 bg-zinc-950 border-r border-white/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-[calc(100vh-4rem)] pt-16 md:pt-0",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="md:hidden absolute top-4 right-4">
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <ScrollArea className="h-full py-6 px-3">
                    <div className="space-y-6">
                        <div className="px-3 mb-2 md:hidden">
                            <span className="text-xl font-bold text-white tracking-tight">PLAYMEET <span className="text-purple-400">ESPORTS</span></span>
                        </div>

                        <div className="space-y-1">
                            <h4 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</h4>
                            {sidebarItems.map((item) => {
                                const isActive = item.exact
                                    ? location.pathname === item.href
                                    : location.pathname.startsWith(item.href);

                                return (
                                    <SidebarItem
                                        key={item.href}
                                        item={item}
                                        isActive={isActive}
                                        onClick={() => onClose?.()}
                                    />
                                );
                            })}
                        </div>

                        <div className="space-y-1 pt-6 border-t border-white/10">
                            <h4 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Account</h4>
                            <SidebarItem
                                item={{ icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' }}
                                isActive={location.pathname === '/dashboard'}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </aside>
        </>
    );
};

export default EsportsSidebar;
