import { useEffect } from 'react';
import EsportsHero from '@/components/esports/home/EsportsHero';
import EsportsGamesSection from '@/components/esports/home/EsportsGamesSection';
import EsportsFeaturedTournaments from '@/components/esports/home/EsportsFeaturedTournaments';
import './esports.css';

const Esports = () => {

    useEffect(() => {
        document.title = "Esports - PLAYMEET";
    }, []);

    return (
        <div className="esports-theme min-h-screen bg-background text-foreground font-sans">
            {/* Hero Section */}
            <EsportsHero />

            {/* Games Categories */}
            <EsportsGamesSection />

            {/* Featured Tournaments */}
            <EsportsFeaturedTournaments />
        </div>
    );
};

export default Esports;
