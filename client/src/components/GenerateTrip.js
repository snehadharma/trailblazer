import React, { useState } from "react";
import HeaderLoggedIn from "./TrailBlazerLoggedIn/HeaderLoggedIn";
import { useLocation, useNavigate } from "react-router-dom";
import NavTrip from "./NavTrip";
import './Generate.css';
import cactusImage from '../assets/cacti.png';
import bootImage from '../assets/boots.png';

const GenerateTrip = () => {
  const location = useLocation();
  const [userPrompt, setUserPrompt] = useState(location.state?.userPrompt || "");
  const navigate = useNavigate();

  const handleNavTrip = () => {
    console.log(userPrompt);
    navigate("/trailblazer/navtrip", { state:  { userPrompt } });
  };


  return (
    <div>
      <HeaderLoggedIn />
      <div className="generate-container">
      <h2 className="generate-header">describe your ideal trip:</h2>
      <textarea
        className="generate-input"
        type="text"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder ="I’m traveling from Dallas to Austin and want to eat the best BBQ and see the most beautiful natural parks across Texas..."
      />
      <button className="generate-button" onClick={handleNavTrip}>let's go!</button>
      <img src={cactusImage} alt="Cactus" className="img" />
      </div>
      <img src={bootImage} alt="Boots" className="imgboot" />
    </div>
  );
};

export default GenerateTrip;
