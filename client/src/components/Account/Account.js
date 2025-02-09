import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Account.module.css';
import texas1 from "../../assets/texas1.jpeg";
import texas2 from "../../assets/texas2.jpg";
import texas3 from "../../assets/texas3.jpeg";
import texas4 from "../../assets/texas4.jpeg";
import texas5 from "../../assets/texas5.jpeg";
import texas6 from "../../assets/texas6.jpeg";

import cactiImage from "../../assets/cacti.png";
import './Account.module.css';
import { auth, db, storage } from '../firebase';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Header from '../TrailBlazerLoggedIn/HeaderLoggedIn';
import pfpImage from '../../assets/pfp.png'; // Going up two levels to access 'assets'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Modular imports
import imageDb from '../firebase';


function Account() {
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState('');
  const [hardcodedTrips, setHardcodedTrips] = useState([]);
  const [myTrips, setMyTrips] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    if (image == null) return;  // If no file selected, do nothing
  
    try {
      const storageRef = ref(storage, `/images/${image.name }`); // Create a reference to the file path in Firebase Storage
  
      await uploadBytes(storageRef, image);
     
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const fetchUserData = () => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("No authenticated user");
        navigate('/login');  // Redirect to login if no user
        return;
      }

      try {
        console.log("Authenticated user:", user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          setMyTrips(docSnap.roadTrips || []);
        } else {
          console.log("User document not found");
          setUserDetails(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
    return unsubscribe;  // Important for cleanup
  };



  useEffect(() => {
    const unsubscribe = fetchUserData();
    if (userDetails) {
      const trips = userDetails.roadTrips?.map((trip, index) => ({
        id: `ID-${index}`,  // You can adjust this ID generation logic as needed
        Query: trip.itinerary?.[0]?.description ?? "No description available", // safely access description
        Time: new Date().toLocaleString(), // Replace with actual time if needed
        User: userDetails.username,
        imageUrl: [texas1, texas2, texas3],  // Adjust the images as per your requirements
      }));

      setHardcodedTrips(trips);
    }
    return () => unsubscribe();  // Cleanup on component unmount
  }, [userDetails]);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate('/');
      console.log("User logged out successfully.")
    } catch (error) {
      console.log ("Error logging out: " , error);
    }
  }



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

  return (
    <div>
      <Header />
      {userDetails ? (
        <>
          <div className={styles['account-info']}>
            <img className={styles['profile-pic']} src={pfpImage} alt="PFP" />
            <div className={styles['account-details']}>
              <h3 className={styles['account-name']}>{userDetails.firstName} {userDetails.lastName}</h3>
              <h3 className={styles['account-username']}>@{userDetails.username}</h3>
              <h3 className={styles['account-email']}>{userDetails.email}</h3>
            </div>
            <img className={styles.logo} src={cactiImage} alt="Cacti" />
            <button onClick={handleLogout} className={styles['logout-button']}>
              Logout
            </button>
          </div>
  
          <div className={styles['trips-box']}>
            <div className={styles.rectangle}>
            <h3 className={styles['trips-title']}>My Trips!</h3>
              <div className={styles.subRect}>
                {hardcodedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className={styles.trip}
                    onClick={() => handleTripClick(trip)}
                  >
                    <img src={trip.imageUrl[0]} alt={trip.User} />
                  </div>
                ))}
              </div>
              {/* <input type="file" onChange={(e) => { setImage(e.target.files[0]); }} />
              <button onClick={upload}>Upload</button> */}
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
                    <button onClick={() => setSelectedTrip(null)}>Close</button>
                  </div>
                  </div>
                </div>
              )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Account;
