import React from "react";
import TripPlanner from "./TripPlanner";
import GoogleMapComponent from "./GoogleMapComponent";
import { getRoadTripIdeas } from "../api/aiService";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDirections } from "../api/mapService";
import {
  LoadScript,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Header from "./TrailBlazerLoggedIn/HeaderLoggedIn";

function NavTrip() {
  const location = useLocation();
  const [cities, setCities] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [directions, setDirections] = useState(null);
  const [itinerary, setItinerary] = useState();

  const prompt = location.state.userPrompt; // Extract userPrompt from state
  // const handleGenerateTrip = async () => {
  //   console.log(prompt);
  //   const itinerary = await getRoadTripIdeas(prompt);
  //   console.log(itinerary);
  //   setCities(itinerary);
  //   getDirections(itinerary, setDirections);
  // };

  const handleSaveTrip = () => {

  }

  const handleEditPrompt = () => {

  }

  const handleRegenerate = () => {
    
  }

  function extractCities(itinerary) {
    return itinerary.map((location) => location.city);
  }

  function extractDescriptions(itinerary) {
    return itinerary.map((location) => location.description);
  }

  useEffect(() => {
    if (prompt) {
      const fetchTrip = async () => {
        console.log(prompt);
        // const itinerary = await getRoadTripIdeas(prompt);
        const it = [
          {
            city: "San Antonio",
            description:
              "Known for its famous Tex-Mex cuisine, San Antonio offers a variety of traditional Mexican dishes such as tacos, enchiladas, and tamales.",
          },
          {
            city: "Austin",
            description:
              "Experience authentic Mexican street food and upscale Mexican restaurants in the capital city of Texas.",
          },
          {
            city: "Houston",
            description:
              "Explore Houston's vibrant Mexican food scene with a diverse range of options including mole, pozole, and chiles rellenos.",
          },
          {
            city: "Dallas",
            description:
              "Indulge in mouth-watering Tex-Mex dishes and traditional Mexican fare in the bustling city of Dallas.",
          },
          {
            city: "Corpus Christi",
            description:
              "Savor fresh seafood with a Mexican twist in Corpus Christi, known for its delicious ceviche and fish tacos.",
          },
          {
            city: "San Antonio",
            description:
              "End your journey where you started and enjoy one last delicious meal of traditional Mexican food in San Antonio.",
          },
        ];
        setItinerary(it);

        console.log("Itinerary received:", it); // Debug log

        const cityArr = extractCities(it);
        const descrArr = extractDescriptions(it);
        console.log("city array: " + cityArr);
        setCities(cityArr);

        console.log("descriptions: " + descrArr);
        setDescriptions(descrArr);
        // getDirections(itinerary, setDirections);
      };

      fetchTrip();
    }
  }, [prompt]); // Runs whenever `prompt` changes

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div>
      <Header />
      <h1>Yeehaw! Here are your trip details!</h1>
      <button onClick={handleSaveTrip}>save</button>
      <button onClick={handleRegenerate}>regenerate</button>
      <button onClick={handleEditPrompt}>edit</button>
      {/* <TripPlanner /> */}
      {/* <GoogleMapComponent /> */}

      <div>
        {/* Left Side: Itinerary */}
        <div>
          {cities.length > 0 && (
            <ul>
              {cities.map((city, index) => (
                <li key={index}>
                  <h3>{city}</h3>
                  <p>{descriptions[index]}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side: Map */}
        <div>
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
