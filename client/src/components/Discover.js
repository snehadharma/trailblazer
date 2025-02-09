import React from 'react';
import {useState} from "react";
import Header from './TrailBlazerLoggedIn/HeaderLoggedIn';
import styles from './Discover.module.css';
import texas1 from "../assets/texas1.jpeg";
import texas2 from "../assets/texas2.jpg";
import texas3 from "../assets/texas3.jpeg";
import texas4 from "../assets/texas4.jpeg";
import texas5 from "../assets/texas5.jpeg";
import texas6 from "../assets/texas6.jpeg";
import texas7 from "../assets/texas7.jpeg";
import texas8 from "../assets/texas8.jpeg";


function Discover() {
const hardcodedTrips = [
  {
    id: "HXdwWbpDDKkTW1kHafrF",
    Query: "I’m traveling from Dallas to Austin and want to eat the best BBQ and see the most beautiful natural parks across Texas...",
    Time: "February 7, 2025 at 4:03:04 PM UTC-6",
    User: "snehalikesbbq",
    imageUrl: [texas1, texas2, texas3], // Use the imported image
  },

  {
    id: "YAqhtk4Ne015C7FEfR9Q",
    Query: "i love texas",
    Time: "January 6, 2025 at 2:42.12PM UTC-6",
    User: "oliviaontheroad",
    imageUrl: [texas2, texas2, texas3], // Use the imported image
  },

  {
    id: "xxx",
    Query: "rianna skaria sucks",
    Time: "October 21, 2016 at 11:08:35PM UTC-5",
    User: "riannatravels",
    imageUrl: [texas3, texas2, texas3], // Use the imported image
  },

  {
    id: "xxx",
    Query: "I’m traveling from Dallas to Austin and want to eat the best BBQ and see the most beautiful natural parks across Texas...",
    Time: "February 17, 2025 at 6:04:02 PM UTC-6",
    User: "awaywithaanya",
    imageUrl: [texas4, texas2, texas3], // Use the imported image
  },

  {
    id: "xxx",
    Query: "I’m traveling from Dallas to Austin and want to eat the best BBQ and see the most beautiful natural parks across Texas...",
    Time: "February 17, 2025 at 6:04:02 PM UTC-6",
    User: "awaywithaanya",
    imageUrl: [texas5, texas2, texas3], // Use the imported image
  },

  {
    id: "xxx",
    Query: "I’m traveling from Dallas to Austin and want to eat the best BBQ and see the most beautiful natural parks across Texas...",
    Time: "February 17, 2025 at 6:04:02 PM UTC-6",
    User: "awaywithaanya",
    imageUrl: [texas6, texas2, texas3], // Use the imported image
  },

  {
    id: "xxx",
    Query: "I’m traveling from Dallas to Austin and want to eat the best BBQ and see the most beautiful natural parks across Texas...",
    Time: "February 17, 2025 at 6:04:02 PM UTC-6",
    User: "awaywithaanya",
    imageUrl: [texas7, texas2, texas3], // Use the imported image
  },

  {
    id: "xxx",
    Query: "I’m traveling from Dallas to Austin and want to eat the best BBQ and see the most beautiful natural parks across Texas...",
    Time: "February 17, 2025 at 6:04:02 PM UTC-6",
    User: "awaywithaanya",
    imageUrl: [texas8, texas2, texas3], // Use the imported image
  },
];

const [selectedTrip, setSelectedTrip] = useState(null);
const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

const handleTripClick = (trip) => {
  setSelectedTrip(trip);
  setCurrentPhotoIndex(0);
};

const goToNextPhoto = () => {
  setCurrentPhotoIndex((prevIndex) =>
    (prevIndex + 1) % selectedTrip.imageUrl.length
  );
};

const goToPreviousPhoto = () => {
  setCurrentPhotoIndex((prevIndex) =>
    prevIndex === 0 ? selectedTrip.imageUrl.length - 1 : prevIndex - 1
  );
};

const firstFour = hardcodedTrips.slice(0,4);
const lastFour = hardcodedTrips.slice(4, 8);

return (
  <div>
    <Header />
    <div className={styles.rectangle}>
      <div className={styles.subRect} >
        {firstFour.map((trip) => (
          <div
            key={trip.id}
            className={styles.trip}
            onClick={() => handleTripClick(trip)}
          >
            <img src={trip.imageUrl[0]} alt={trip.User} />
          </div>
        ))}
      </div>
      <div className={styles.subRect} >
        {lastFour.map((trip) => (
          <div
            key={trip.id}
            className={styles.trip}
            onClick={() => handleTripClick(trip)}
          >
            <img src={trip.imageUrl[0]} alt={trip.User} />
          </div>
        ))}
      </div>
    </div>
    
    {selectedTrip && (
       <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
        <div className={styles.carousel}>
                <img
                  className={styles.innerPhoto}
                  src={selectedTrip.imageUrl[currentPhotoIndex]}
                  alt={`${selectedTrip.User}'s trip`}
                />
                {/* Navigation Buttons */}
                <button className={styles.prevButton} onClick={goToPreviousPhoto}>
                  &#10094; {/* Left arrow */}
                </button>
                <button className={styles.nextButton} onClick={goToNextPhoto}>
                  &#10095; {/* Right arrow */}
                </button>
              </div>
          <h2>@{selectedTrip.User}</h2>
          <p><strong></strong> {selectedTrip.Query}</p>
          {/* <p><strong>Date:</strong> {selectedTrip.Time}</p> */}
          <button onClick={() => setSelectedTrip(null)}>Close</button>
        </div>
        </div>
      </div>
    )}
    
  </div>
);
}

export default Discover;