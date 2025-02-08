import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const cities = ["Austin, TX", "Dallas, TX", "Houston, TX"];

const TripPlanner = () => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const origin = cities[0];
        const destination = cities[cities.length - 1];
        const waypoints = cities.slice(1, -1).join("|");

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${API_KEY}`;

        const response = await axios.get(url);
        setRoute(response.data);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchDirections();
  }, []);

  return (
    <div>
      <h2>Trip Route</h2>
      {route ? <pre>{JSON.stringify(route, null, 2)}</pre> : <p>Loading route...</p>}
    </div>
  );
};

export default TripPlanner;
