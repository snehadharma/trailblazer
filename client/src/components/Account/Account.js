import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Account.module.css';
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

  const navigate = useNavigate();

  const upload = async () => {
    if (image == null) return;  // If no file selected, do nothing
  
    try {
      const storageRef = ref(storage, `/images/${image.name }`); // Create a reference to the file path in Firebase Storage
  
      // // Upload the file
      await uploadBytes(storageRef, image);
  
      // // Get the download URL for the uploaded file
      // const downloadURL = await getDownloadURL(storageRef);
  
      // // Update the user's Firestore document with the new photo URL
      // const user = auth.currentUser;
      // if (user) {
      //   const userRef = doc(db, "Users", user.uid);
      //   await updateDoc(userRef, {
      //     photos: [...(userDetails?.photos || []), downloadURL],  // Add the new photo to the 'photos' array
      //   });
  
      //   console.log("Image URL saved to Firestore:", downloadURL);
      //   alert("Upload Successful!");
      // }
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
    return () => unsubscribe();  // Cleanup on component unmount
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate('/');
      console.log("User logged out successfully.")
    } catch (error) {
      console.log ("Error logging out: " , error);
    }
  }

  return (
    <div>
      <Header />
      {userDetails ? (
        <>
          <div className={styles['account-info']}>
          <img className={styles['profile-pic']} src={pfpImage} alt="PFP" />
            <div className={styles['account-details']}>
              <h3 className= {styles['account-name']}> {userDetails.firstName} {userDetails.lastName}</h3>
              <h3 className={styles['account-username']}>@{userDetails.username}</h3>
              <h3 className= {styles['account-email']}>  {userDetails.email} </h3>
            </div>
            <button onClick={handleLogout} className={styles['logout-button']}>
              Logout
            </button>
          </div>

          <div className={styles['trips-box']}>
            <h3 className={styles['trips-title']}>My Trips!</h3>

            <input type="file" onChange={(e) => { setImage(e.target.files[0]); }} />
            <button onClick={upload}>Upload</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Account;
