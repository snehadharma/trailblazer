import React from 'react';
import Header from './TrailBlazerLoggedIn/HeaderLoggedIn';
import TripPlanner from './TripPlanner';
import GoogleMapComponent from './GoogleMapComponent';
import CreateTrip from './CreateTrip';

function GenerateTrip() {
  return (
    <div>
        < Header /> 
        < CreateTrip />
        <h1>Yeehaw! Here's your trip details!</h1>
        <TripPlanner />
        <GoogleMapComponent />
    </div>
  );
}

export default GenerateTrip;