import React from 'react';
import Navbar from '../components/layout/Navbar/Navbar';
import Hero from '../components/sections/Home/Hero';
import TripSlider from '../components/sections/Home/TripSlider';
import Features from '../components/sections/Home/Features';
import ContactBanner from '../components/sections/Home/ContactBanner';
import Footer from '../components/layout/Footer/Footer';
import Banner from '../components/sections/Home/Banner';

// Import Data
import { 
    dealsData, 
    internationalData, 
    indiaData, 
    romanticData 
} from '../data';

// Video Imports (Update these paths to where you stored the videos)
import intVideo from '../assets/videos/international.mp4';
import indiaVideo from '../assets/videos/india.mp4';
import romanticVideo from '../assets/videos/romantic.mp4';

const Home = () => {
    return (
        <div className="bg-black font-var[(--font-montserrat)] text-gray-900">
            <Navbar />
            <Hero />

            <main>
                {/* 1. Deals Section */}
                <div>
                    <TripSlider 
                        title="Exhilarating Deals" 
                        slides={dealsData} 
                        isDealSlider={true} 
                    />
                </div>

                {/* 2. Banner Image */}
                <Banner />

                {/* 3. International Trips (Video Background) */}
                <TripSlider 
                    title="International Trips" 
                    subtitle="Discover the world, one destination at a time"
                    videoSrc={intVideo} 
                    slides={internationalData}
                />

                {/* 4. Explore India (Video Background) */}
                <TripSlider 
                    title="Explore India" 
                    subtitle="A Journey through Time, Colour and Culture"
                    videoSrc={indiaVideo} 
                    slides={indiaData}
                />

                {/* 5. Romantic Escapes (Video Background) */}
                <TripSlider 
                    title="Romantic Escapes" 
                    subtitle="Where Forever Begins.... Together!"
                    videoSrc={romanticVideo} 
                    slides={romanticData}
                />

                {/* 6. Features Grid */}
                <Features />

                {/* 7. Contact Banner */}
                <ContactBanner />
            </main>

            <Footer />
        </div>
    );
};

export default Home;