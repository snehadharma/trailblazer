import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader
} from "@react-google-maps/api";

// const { loaded, loadError } = useLoadScript({
//   googleMapsApiKey: config.googleMapsApiKey,
//   libraries: ["places", "directions"],
// });
const libs = ['directions', 'maps'];

function TripFetcher({ itinerary }) {
  const [directions, setDirections] = useState(null);
  const [cities, setCities] = useState([]);
  const [map, setMap] = useState(null);

  const saveMap = (mapInstance) => {
    console.log("Google Map loaded:", mapInstance);
    setMap(mapInstance);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libs,
  });

  const containerStyle = {
    width: "100%",
    height: "103.5%",
    borderRadius: "15px", // Adds rounded corners
    overflow: "hidden",   // Ensures the corners are properly clipped
  };

  // Extract the cities from the itinerary
  useEffect(() => {
    if (itinerary && itinerary.length > 0) {
      const cityList = itinerary.map((location) => `${location.city}, TX`);
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
    }
  }, [isLoaded, cities]);

  return (
    <>
    {isLoaded && <GoogleMap
      onLoad={saveMap}
      mapContainerStyle={containerStyle}
      center={{ lat: 31.9686, lng: -99.9018 }}
      zoom={6}
    >
       {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>}
    </>
  );
}

export default TripFetcher;

// <GoogleMap
    //   mapContainerStyle={containerStyle}
    //   center={{ lat: 31.9686, lng: -99.9018 }}
    //   zoom={6}
    // >
    //   {directions && <DirectionsRenderer directions={directions} />}
    // </GoogleMap>