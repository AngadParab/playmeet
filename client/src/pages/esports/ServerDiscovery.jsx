import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Users, Server, ExternalLink, Zap, Radio } from 'lucide-react';

const servers = [
    {
        id: 1,
        name: "Valorant India Officials",
        type: "Discord Community",
        members: "15k+",
        region: "India",
        tags: ["Competitive", "Scrims", "Tournaments"],
        inviteLink: "#"
    },
    {
        id: 2,
        name: "Mumbai 128 Tick [DM/Retake]",
        type: "CS:GO Server",
        members: "32/64",
        region: "Mumbai",
        tags: ["128 Tick", "FFA", "Low Latency"],
        inviteLink: "#"
    },
    {
        id: 3,
        name: "Faceit India Hub",
        type: "Platform Hub",
        members: "5k+",
        region: "SEA/India",
        tags: ["Ranked", "Prizes", "Anti-Cheat"],
        inviteLink: "#"
    },
    {
        id: 4,
        name: "Apex Legends LFG",
        type: "Discord Community",
        members: "8k+",
        region: "Asia",
        tags: ["LFG", "Ranked", "Casual"],
        inviteLink: "#"
    },
    {
        id: 5,
        name: "Minecraft SMP [Survival]",
        type: "Game Server",
        members: "120/500",
        region: "Singapore",
        tags: ["Survival", "Economy", "PvP"],
        inviteLink: "#"
    },
    {
        id: 6,
        name: "Overwatch 2 Scrims",
        type: "Discord Community",
        members: "3k+",
        region: "Global",
        tags: ["Scrims", "Coaching", "VOD Review"],
        inviteLink: "#"
    }
];

const ServerDiscovery = () => {
    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className='fixed inset-0 z-0 pointer-events-none'>
                <div className='absolute top-20 left-1/3 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]' />
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-end mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-3">
                            <Radio className="w-4 h-4" />
                            <span>Community Hub</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-white">
                            Server <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Discovery</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-2xl text-lg">
                            Find the best communities, scrims, and practice servers to level up your game.
                        </p>
                    </div>

                    <div className="flex w-full md:w-auto gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                                placeholder="Search servers..."
                                className="pl-10 bg-white/5 border-white/10 text-white focus:border-purple-500 w-full md:w-80 h-12 rounded-xl placeholder:text-gray-600"
                            />
                        </div>
                        <Button className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-900/20">
                            Find
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servers.map((server, index) => (
                        <motion.div
                            key={server.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full border-purple-500/10 bg-black/40 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.1)] transition-all group backdrop-blur-md cursor-pointer">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="outline" className="mb-3 border-purple-500/30 text-purple-300 bg-purple-500/5">
                                            {server.type}
                                        </Badge>
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                                            <Globe className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        {server.name}
                                    </CardTitle>
                                    <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5 text-gray-500" />
                                            {server.members}
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center gap-1.5">
                                            <Server className="w-3.5 h-3.5 text-gray-500" />
                                            {server.region}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {server.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-white/5 text-xs text-gray-300 border border-white/5 hover:bg-white/10">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button className="w-full gap-2 border border-white/10 bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/30 transition-all font-semibold">
                                        Connect <ExternalLink className="w-3 h-3" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Call to Action Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/[0.07] hover:border-purple-500/30 transition-all cursor-pointer text-center group h-full"
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Zap className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h3 className="font-bold text-xl text-white mb-2 group-hover:text-purple-400 transition-colors">Promote Your Server</h3>
                        <p className="text-sm text-gray-400 mb-6 max-w-xs">Get listed and find new members for your community server.</p>
                        <Button variant="link" className="text-cyan-400 hover:text-cyan-300 font-bold p-0">Learn More &rarr;</Button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ServerDiscovery;
