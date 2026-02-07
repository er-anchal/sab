import React from 'react';
import TripsLayout from '../components/layout/TripsLayout';
// Import the new variable name you created in Step 1
import { InternationalDestinations } from '../data';
import internationalHero from '../assets/banner/international.webp';

const InternationalTrips = () => {
  return (
    <TripsLayout
      heroImage={internationalHero}
      heroTitle="Book International Holiday Packages"
      heroSubtitle="International Holiday Packages Crafted For Every Dream, Every Destination"
      exploreTitle="Explore International"
      exploreData={InternationalDestinations}
    />
  );
};

export default InternationalTrips;