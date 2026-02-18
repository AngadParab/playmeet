import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Users, Server, ExternalLink, Zap } from 'lucide-react';

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
    }
];

const ServerDiscovery = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/50 p-6 rounded-xl border border-border/50 backdrop-blur-sm">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                        <Server className="w-6 h-6 text-primary" />
                        Server & Platform Discovery
                    </h2>
                    <p className="text-muted-foreground">Find the best communities, scrims, and practice servers.</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search servers..."
                            className="pl-9 bg-background/50 border-border/50 w-full md:w-64 focus-visible:ring-primary/50"
                        />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                        Find
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servers.map((server, index) => (
                    <motion.div
                        key={server.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full border-border/50 bg-card/50 hover:border-primary/50 hover:shadow-md transition-all group backdrop-blur-md">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <Badge variant="outline" className="mb-2 border-primary/20 text-primary bg-primary/5">
                                        {server.type}
                                    </Badge>
                                    <Globe className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                    {server.name}
                                </CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="w-3.5 h-3.5" />
                                    {server.members}
                                    <span>•</span>
                                    {server.region}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {server.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-muted/50 text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <Button className="w-full gap-2 border-primary/20 hover:bg-primary/10 hover:text-primary" variant="outline">
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
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/50 rounded-xl bg-card/20 hover:bg-card/40 transition-colors cursor-pointer text-center group"
                >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">Promote Your Server</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get listed and find new members for your community.</p>
                    <Button variant="link" className="text-primary">Learn More &rarr;</Button>
                </motion.div>
            </div>
        </div>
    );
};

export default ServerDiscovery;
