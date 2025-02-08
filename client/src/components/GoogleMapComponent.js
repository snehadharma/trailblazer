import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const cities = ["New York, NY", "Philadelphia, PA", "Washington, DC"];

// const GoogleMapComponent = () => {
//   const [directions, setDirections] = useState(null);

//   useEffect(() => {
//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: cities[0],
//         destination: cities[cities.length - 1],
//         waypoints: cities.slice(1, -1).map((city) => ({ location: city, stopover: true })),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error("Error fetching directions:", status);
//         }
//       }
//     );
//   }, []);
function GoogleMapComponent() {
  return (
    // <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    //   <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 39.95, lng: -75.16 }} zoom={6}>
    //     {directions && <DirectionsRenderer directions={directions} />}
    //   </GoogleMap>
    // </LoadScript>
    <div>

    </div>
  );
}

export default GoogleMapComponent;
