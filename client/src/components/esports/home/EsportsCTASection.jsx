import { Link } from 'react-router-dom'
import {
    Rocket,
    ArrowRight,
    ChevronRight,
    Sparkles,
    Users,
    Trophy,
    Shield,
    Star,
    MonitorPlay,
    Gamepad2
} from 'lucide-react'

const EsportsCTASection = () => {
    // Non-authenticated user CTA (or generic public view)
    const features = [
        {
            icon: Users,
            label: 'Recruit Players',
            desc: 'Build your dream roster',
        },
        {
            icon: Gamepad2,
            label: 'Find Scrims',
            desc: 'Practice against the best',
        },
        {
            icon: Trophy,
            label: 'Win Prizes',
            desc: 'Compete in daily cups',
        },
        {
            icon: Shield,
            label: 'Anti-Cheat',
            desc: 'Verified fair play',
        }
    ]

    const stats = [
        { label: "Active Players", value: "250K+", icon: Users },
        { label: "Matches Daily", value: "12K+", icon: MonitorPlay },
        { label: "Prize Money", value: "$1M+", icon: Trophy },
        { label: "Avg Rating", value: "4.8★", icon: Star },
    ]

    return (
        <section className="py-24 bg-[#09090b] border-t border-white/10 relative overflow-hidden">
            {/* Fancy Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full text-white border border-purple-500/20 mb-6 font-medium">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">Enter the Arena</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-8">
                            Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Pro Journey?</span>
                        </h2>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                            Join the ultimate esports platform. Create your profile, find a team, and start competing today.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                                    <div className="text-center">
                                        <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gray-900 flex items-center justify-center border border-white/10">
                                            <stat.icon className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div className="text-2xl font-bold font-heading text-white mb-1">{stat.value}</div>
                                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        <Link to="/register">
                            <button className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
                                <Rocket className="w-6 h-6" />
                                <span>Join Nexus Free</span>
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </Link>

                        <Link to="/esports/tournaments">
                            <button className="w-full sm:w-auto px-8 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 text-lg hover:border-purple-500/50">
                                <span>Browse Tournaments</span>
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="group bg-white/5 rounded-2xl p-6 text-center border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:from-purple-600 group-hover:to-cyan-600 transition-all duration-300">
                                    <feature.icon className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                                </div>
                                <div className="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">{feature.label}</div>
                                <div className="text-gray-500 text-sm">{feature.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EsportsCTASection
