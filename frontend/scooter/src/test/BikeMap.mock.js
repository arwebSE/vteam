import React from "react";

export default function MockBikeMap() {
  // Custom implementation or mock data for testing
  const currentLocation = {
    lat: 51.5074,
    lng: -0.1278,
  };

  return (
    <div>
      {/* Mock map */}
      <div>Mock Bike Map</div>
      <div>Current Location: {currentLocation.lat}, {currentLocation.lng}</div>
    </div>
  );
}