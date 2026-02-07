import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/sections/Home/Hero';
import TripSlider from '../components/sections/Home/TripSlider';
import Features from '../components/sections/Home/Features';
import ContactBanner from '../components/sections/Home/ContactBanner';
import Banner from '../components/sections/Home/Banner';

// Import Mapper and Default Static Data
import { 
    mapDbToData, 
    dealsData, 
    internationalData, 
    indiaData, 
    romanticData 
} from '../data';

// Video Imports
import intVideo from '../assets/videos/international.mp4';
import indiaVideo from '../assets/videos/india.mp4';
import romanticVideo from '../assets/videos/romantic.mp4';

const Home = () => {
    // Initializing with "Default" static data
    const [intl, setIntl] = useState(internationalData);
    const [india, setIndia] = useState(indiaData);
    const [deals, setDeals] = useState(dealsData);
    const [romantic, setRomantic] = useState(romanticData);

    useEffect(() => {
        const fetchAndMergeData = async () => {
            try {
                // Fetch dynamic packages from database
                const [intRes, indRes, dealRes, romRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/packages?category=international'),
                    axios.get('http://localhost:5001/api/packages?category=india'),
                    axios.get('http://localhost:5001/api/packages?category=deal'),
                    axios.get('http://localhost:5001/api/packages?category=honeymoon')
                ]);

                // Merge Logic: [...Default Data, ...Live Database Data]
                setIntl([...internationalData, ...mapDbToData(intRes.data)]);
                setIndia([...indiaData, ...mapDbToData(indRes.data)]);
                setDeals([...dealsData, ...mapDbToData(dealRes.data)]);
                setRomantic([...romanticData, ...mapDbToData(romRes.data)]);
            } catch (err) {
                console.error("Using defaults as backup:", err);
            }
        };
        fetchAndMergeData();
    }, []);

    return (
        <div className="bg-black font-var[(--font-montserrat)] text-gray-900">
            <Hero />
            <main>
                <TripSlider title="Exhilarating Deals" slides={deals} isDealSlider={true} />
                <Banner />
                <TripSlider title="International Trips" slides={intl} videoSrc={intVideo} />
                <TripSlider title="Explore India" slides={india} videoSrc={indiaVideo} />
                <TripSlider title="Romantic Escapes" slides={romantic} videoSrc={romanticVideo} />
                <Features />
                <ContactBanner />
            </main>
        </div>
    );
};

export default Home;