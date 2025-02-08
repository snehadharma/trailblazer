import React from "react";
import TripPlanner from "./TripPlanner";
import GoogleMapComponent from "./GoogleMapComponent";
import { getRoadTripIdeas } from "../api/aiService";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getDirections } from "../api/mapService";
import { LoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import Header from "./TrailBlazerLoggedIn/HeaderLoggedIn";

function NavTrip() {
const location = useLocation();
  const [cities, setCities] = useState([]);
  const [directions, setDirections] = useState(null);
  

  const prompt = location.state.userPrompt; // Extract userPrompt from state
  // const handleGenerateTrip = async () => {
  //   console.log(prompt);
  //   const itinerary = await getRoadTripIdeas(prompt);
  //   console.log(itinerary);
  //   setCities(itinerary);
  //   getDirections(itinerary, setDirections);
  // };

  useEffect(() => {
    if (prompt) {
      const fetchTrip = async () => {
        console.log(prompt);
        const itinerary = await getRoadTripIdeas(prompt);
        if (itinerary) {
          console.log("our itinerary" + JSON.stringify(itinerary.data, null, 2));
        } else {
          console.log("no response");
        }
        console.log("Itinerary received:", itinerary); // Debug log
        setCities(itinerary);
        // setCities(itinerary);
        // getDirections(itinerary, setDirections);
      };

      fetchTrip();
    }
  }, [prompt]); // Runs whenever `prompt` changes

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div>
      <Header />
      <h1>Yeehaw! Here are your trip details!</h1>
      {/* <TripPlanner /> */}
      {/* <GoogleMapComponent /> */}

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Side: Itinerary */}
        <div style={{ width: "50%" }}>
          {/* {cities.length > 0 && (
          <ul>
            {cities.map((city, index) => (
              <li key={index}>
                <h3>{city.city}</h3>
                <p>{city.description}</p>
              </li>
            ))}
          </ul>
        )} */}
        </div>

        {/* Right Side: Map */}
        <div style={{ width: "50%" }}>
          {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 31.9686, lng: -99.9018 }} zoom={6}>
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript> */}
        </div>
      </div>
    </div>
  );
}

export default NavTrip;
