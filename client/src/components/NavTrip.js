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
import pinImage from '../assets/pin-icon.png';
import bootImage from '../assets/boots.png';


function NavTrip() {
  // Your API key for Google Maps
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const location = useLocation();
  const [cities, setCities] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [itinerary, setItinerary] = useState();
  const [currentTripId, setCurrentTripId] = useState(null);
  const [regenKey, setRegenKey] = useState(0);
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

  const handleEditPrompt = () => {
    navigate("/trailblazer/generatetrip", { state: { userPrompt: prompt } });
  };

  const handleRegenerate = () => {
    setRegenKey(prevKey => prevKey + 1);
  };

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
        const it = await getRoadTripIdeas(prompt);

        setItinerary(it);

        console.log("Itinerary received:", it); // Debug log
        let cityArr = [];
        let descrArr = [];
        
        try {
          cityArr = extractCities(it);
          descrArr = extractDescriptions(it);

          console.log("city array: " + cityArr);
          setCities(cityArr);

          console.log("descriptions: " + descrArr);
          setDescriptions(descrArr);
        } catch {
          fetchTrip();
        }
        // getDirections(itinerary, setDirections);
      };

      fetchTrip();
    }
  }, [prompt, regenKey]); // Runs whenever `prompt` changes

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
          <img src={bootImage} alt="Boots" className="imgbootnav" />
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
                  <li key={index} className="navtrip-item">
                    <img src={pinImage} alt="Pin" className="navtrip-pin" />
                    <div className="navtrip-info">
                      <h3>{city}</h3>
                      <p>{descriptions[index]}</p>
                    </div>
                  </li>
                ))}
              </ul>

              )}
            </div>

            {/* Right Side: Map */}
            <div className="navtrip-map">
              {/* <LoadScript googleMapsApiKey={googleMapsApiKey}> */}
                <TripFetcher itinerary={itinerary} />
              {/* </LoadScript> */}
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
