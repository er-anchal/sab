import React from "react";
import TripCardContainer from "./TripCardContainer";
import TripCardImage from "./TripCardImage";
import TripCardGradientOverlay from "./TripCardGradientOverlay";
import TripCardContent from "./TripCardContent";
import TripCardDealHoverOverlay from "./TripCardDealHoverOverlay";

const TripCard = ({ slide, variant = "standard" }) => {
  const isDeal = variant === "deal";
  const isVideo = variant === "video"; // with-video swiper ke liye

  return (
    <TripCardContainer>
      <TripCardImage slide={slide} />

      {/* Gradient Overlay */}
      <TripCardGradientOverlay isDeal={isDeal} />

      {/* Content */}
      <TripCardContent slide={slide} isDeal={isDeal} isVideo={isVideo} />

      {/* Deal Specific Hover Overlay (Arrow) */}
      {isDeal && <TripCardDealHoverOverlay />}
    </TripCardContainer>
  );
};

export default TripCard;
