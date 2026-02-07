import React from 'react';
import TripsLayout from '../components/layout/TripsLayout';
// Import the new variable name you created in Step 1
import { IndianDestinations } from '../data'; 
import indiaHero from '../assets/banner/india-wallpaper.webp';

const IndiaTrips = () => {
  return (
    <TripsLayout
      heroImage={indiaHero}
      heroTitle="Book India Holiday Packages"
      heroSubtitle="India Holiday Packages Crafted For Every Dream, Every Destination"
      exploreTitle="Explore India"
      exploreData={IndianDestinations}
    />
  );
};

export default IndiaTrips;