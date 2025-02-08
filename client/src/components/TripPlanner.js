// import React, { useState } from "react";
// import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
// import { getDirections } from "../api/mapService";
// import { getRoadTripIdeas } from "../api/aiService";

// const containerStyle = { width: "50vw", height: "500px" };

// const TripPlanner = () => {
//   const [userPrompt, setUserPrompt] = useState("");
//   const [cities, setCities] = useState([]);
//   const [directions, setDirections] = useState(null);

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       {/* Left Side: Itinerary */}
//       <div style={{ width: "50%" }}>

//         {/* {cities.length > 0 && (
//           <ul>
//             {cities.map((city, index) => (
//               <li key={index}>
//                 <h3>{city.city}</h3>
//                 <p>{city.description}</p>
//               </li>
//             ))}
//           </ul>
//         )} */}
//       </div>

//       {/* Right Side: Map */}
//       <div style={{ width: "50%" }}>
//         {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//           <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 31.9686, lng: -99.9018 }} zoom={6}>
//             {directions && <DirectionsRenderer directions={directions} />}
//           </GoogleMap>
//         </LoadScript> */}
//       </div>
//     </div>
//   );
// };

// export default TripPlanner;
