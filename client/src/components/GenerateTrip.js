import React, { useState } from "react";
import HeaderLoggedIn from "./TrailBlazerLoggedIn/HeaderLoggedIn";
import { useNavigate } from "react-router-dom";
import NavTrip from "./NavTrip";

const GenerateTrip = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const navigate = useNavigate();

  const handleNavTrip = () => {
    console.log(userPrompt);
    navigate("/trailblazer/navtrip", { state:  { userPrompt } });
  };
  

  return (
    <div>
      <HeaderLoggedIn />

      <h2>Generate road trip here</h2>
      <input
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Enter your road trip preferences..."
      />

      <button onClick={handleNavTrip}>Let's Go!</button>
    </div>
  );
};

export default GenerateTrip;
