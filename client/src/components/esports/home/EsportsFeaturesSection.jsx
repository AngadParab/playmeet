import {
    Sparkles,
    Crosshair,
    Users,
    Trophy,
    MessageCircle,
    Target,
    Smartphone
} from 'lucide-react'

const EsportsFeaturesSection = () => {
    const features = [
        {
            icon: Crosshair,
            title: "Smart Scrim Finder",
            description: "AI-powered matchmaking to find scrim partners of your team's exact skill level and region.",
        },
        {
            icon: Trophy,
            title: "Tournament Management",
            description: "Automated bracket generation, score reporting, and prize distribution for seamless tournament hosting.",
        },
        {
            icon: Users,
            title: "Team Rosters",
            description: "Manage your squad, track player roles, and recruit new talent with advanced profile filtering.",
        },
        {
            icon: MessageCircle,
            title: "Lobby Chat & Voice",
            description: "Integrated low-latency voice and text channels for instant team communication and coordination.",
        },
        {
            icon: Target,
            title: "Performance Analytics",
            description: "Track K/D ratios, win rates, and objective control with detailed post-match statistical breakdowns.",
        },
        {
            icon: Smartphone,
            title: "Mobile Companion",
            description: "Accept matches, check schedules, and chat with your team on the go with our dedicated mobile app.",
        },
    ]

    return (
        <section className='py-24 bg-[#09090b] relative overflow-hidden'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className='container mx-auto px-4 relative z-10'>
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6'>
                        <Sparkles className='w-4 h-4' />
                        <span className='uppercase tracking-widest'>Nexus Features</span>
                    </div>
                    <h2 className='text-3xl md:text-5xl font-bold font-heading text-white mb-6'>
                        Everything you need to <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400'>Dominate the Server</span>
                    </h2>
                    <p className='text-lg text-gray-400 leading-relaxed'>
                        Our platform combines pro-level tools with community features to elevate your competitive gaming experience.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {features.map((feature, index) => (
                        <div key={index} className='group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.1)] transition-all duration-300'>
                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300'>
                                <feature.icon className='w-7 h-7 text-white transition-colors' />
                            </div>
                            <h3 className='text-xl font-bold font-heading text-white mb-3 group-hover:text-cyan-400 transition-colors'>
                                {feature.title}
                            </h3>
                            <p className='text-gray-400 leading-relaxed'>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default EsportsFeaturesSection
