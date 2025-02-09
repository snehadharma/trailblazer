import React from "react";
import { getRoadTripIdeas } from "../api/aiService";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDirections } from "../api/mapService";
import {
  LoadScript,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Header from "./TrailBlazerLoggedIn/HeaderLoggedIn";
import { auth, db } from "./firebase";
import { doc, updateDoc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import TripFetcher from "./TripFetcher";
import './NavTrip.css';

function NavTrip() {
  // Your API key for Google Maps
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const location = useLocation();
  const [cities, setCities] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [itinerary, setItinerary] = useState();
  const [currentTripId, setCurrentTripId] = useState(null);
  const navigate = useNavigate();

  const prompt = location.state?.userPrompt; // Extract userPrompt from state
  const handleGenerateTrip = async () => {
    console.log(prompt);
    const itinerary = await getRoadTripIdeas(prompt);
    console.log(itinerary);
    setCities(itinerary);
  };

  const handleSaveTrip = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("User not logged in");
        return;
      }

      const userRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userRef);

      let existingTrips = userDoc.exists()
        ? userDoc.data().roadTrips || []
        : [];

      if (currentTripId) {
        // **Update the existing trip’s itinerary**
        const updatedTrips = existingTrips.map((trip) =>
          trip.id === currentTripId ? { ...trip, itinerary } : trip
        );

        await updateDoc(userRef, { roadTrips: updatedTrips });
        alert("Itinerary updated!");
      } else {
        // **Save as a new trip**
        const newTripId = Date.now().toString(); // Generate a unique trip ID
        const newTrip = { id: newTripId, itinerary };

        await updateDoc(userRef, { roadTrips: arrayUnion(newTrip) });

        // **Store the new trip ID in state & localStorage**
        setCurrentTripId(newTripId);
        localStorage.setItem("currentTripId", newTripId);

        alert("New trip saved!");
      }
    } catch (error) {
      console.error("Error saving itinerary:", error);
      alert("Failed to save itinerary.");
    }
  };

  const handleEditPrompt = () => {};

  const handleRegenerate = () => {};

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
        // const it = await getRoadTripIdeas(prompt);
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
      <div className="navtrip-container">
      {prompt ? (
        <>
          <h1 className="navtrip-header">Yeehaw! Here are your trip details!</h1>

          <div className="navtrip-buttons">
            <button onClick={handleSaveTrip}>Save</button>
            <button onClick={handleRegenerate}>Regenerate</button>
            <button onClick={handleEditPrompt}>Edit</button>
          </div>

          <div className="navtrip-content">
            {/* Left Side: Itinerary */}
            <div className="navtrip-itinerary">
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
            <div className="navtrip-map">
              <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <TripFetcher itinerary={itinerary} />
              </LoadScript>
            </div>
          </div>
        </>
      ) : (
        <h1 className="navtrip-header">You need a prompt to continue!</h1>
      )}
      </div>
    </div>
  );
}

export default NavTrip;
