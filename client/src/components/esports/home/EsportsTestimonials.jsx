import {
    Star,
    Quote,
} from 'lucide-react'

const EsportsTestimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Alex 'Viper' Chen",
            role: "Valorant IGL",
            content: "Finding quality scrims used to take hours. With Playmeet, my team is matched instantly with opponents of our skill level. It's a game changer.",
            image: "https://i.pravatar.cc/150?u=4"
        },
        {
            id: 2,
            name: "Marcus Jordan",
            role: "Tournament Org",
            content: "Hosting our monthly CS2 ladder has never been easier. The automated brackets and result tracking save us so much admin time.",
            image: "https://i.pravatar.cc/150?u=5"
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            role: "Pro LoL Player",
            content: "I found my current team through the recruitment features here. The profile stats helped me showcase my champion pool effectively.",
            image: "https://i.pravatar.cc/150?u=6"
        },
    ]

    return (
        <section className="py-24 bg-[#09090b] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full text-purple-400 mb-6 border border-purple-500/20">
                        <Quote className="w-4 h-4" />
                        <span className="text-sm font-bold">Player Stories</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">
                        Trusted by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Community</span>
                    </h2>
                    <p className="text-base text-gray-400">
                        Join thousands of gamers who have elevated their play through our platform.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.1)] group relative backdrop-blur-sm"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-purple-500/20 group-hover:text-purple-500/40 transition-colors">
                                <Quote className="w-12 h-12" />
                            </div>
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                                ))}
                            </div>
                            {/* Content */}
                            <p className="text-gray-300 mb-8 relative z-10 leading-relaxed italic">
                                "{testimonial.content}"
                            </p>
                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px]">
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#09090b]">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">{testimonial.name}</div>
                                    <div className="text-sm text-purple-400">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EsportsTestimonials
