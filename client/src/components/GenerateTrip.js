import React from 'react';
import Header from './TrailBlazerLoggedIn/Header';
import TripPlanner from './TripPlanner';
import GoogleMapComponent from './GoogleMapComponent';

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