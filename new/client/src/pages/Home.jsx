import React from 'react';
import { useState, useEffect } from 'react';
import Hero from '../components/sections/Home/Hero';
import TripSlider from '../components/sections/Home/TripSlider';
import Features from '../components/sections/Home/Features';
import ContactBanner from '../components/sections/Home/ContactBanner';
import Banner from '../components/sections/Home/Banner';
import axios from 'axios';

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
import { mapDbToData } from '../data';

const Home = () => {
    const [deals, setDeals] = useState([]);
    const [intl, setIntl] = useState([]);
    const [india, setIndia] = useState([]);
    const [romantic, setRomantic] = useState([]);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [dRes, iRes, nRes, rRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/packages?category=deal'),
                    axios.get('http://localhost:5001/api/packages?category=international'),
                    axios.get('http://localhost:5001/api/packages?category=india'),
                    axios.get('http://localhost:5001/api/packages?category=honeymoon')
                ]);
                setDeals(mapDbToData(dRes.data));
                setIntl(mapDbToData(iRes.data));
                setIndia(mapDbToData(nRes.data));
                setRomantic(mapDbToData(rRes.data));
            } catch (err) {
                console.error("Error fetching home data:", err);
            }
        };
        fetchHomeData();
    }, []);

    return (
        <div className="bg-black font-var[(--font-montserrat)] text-gray-900">
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
        </div>
    );
};

export default Home;