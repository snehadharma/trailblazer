import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";

function TripFetcher({ itinerary }) {
  const [directions, setDirections] = useState(null);
  const [cities, setCities] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "103.5%",
    borderRadius: "15px", // Adds rounded corners
    overflow: "hidden",   // Ensures the corners are properly clipped
  };

  // Extract the cities from the itinerary
  useEffect(() => {
    if (itinerary && itinerary.length > 0) {
      const cityList = itinerary.map((location) => location.city);
      setCities(cityList);
    }
  }, [itinerary]);

  // Generate Directions when cities are loaded
  useEffect(() => {
    if (cities.length > 1) {
      const origin = cities[0];
      const destination = cities[cities.length - 1];
      const waypoints = cities.slice(1, cities.length - 1).map((city) => ({
        location: city,
        stopover: true,
      }));

      // Wait for the google.maps API to be fully loaded
      const loadDirections = () => {
        if (window.google && window.google.maps) {
          const directionsService = new window.google.maps.DirectionsService();
          directionsService.route(
            {
              origin,
              destination,
              waypoints,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error("Directions request failed due to " + status);
              }
            }
          );
        } else {
          console.error("Google Maps API is not loaded.");
        }
      };

      // Load directions after the map API is loaded
      loadDirections();
    }
  }, [cities]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 31.9686, lng: -99.9018 }}
      zoom={6}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default TripFetcher;