import React from 'react';
import Header from './TrailBlazerLoggedIn/Header';

function GenerateTrip() {
  return (
    <div>
        < Header />
        <h1>Yeehaw! Here's your trip details!</h1>
        <TripPlanner />
        <GoogleMapComponent />
    </div>
  );
}

export default GenerateTrip;