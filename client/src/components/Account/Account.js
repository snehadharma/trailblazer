import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Account.module.css';
import './Account.module.css';
import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Header from '../TrailBlazerLoggedIn/HeaderLoggedIn';
import pfpImage from '../../assets/pfp.png'; // Going up two levels to access 'assets'


function Account() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
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
              <h3>{userDetails.username}</h3>
              <h3 className= {styles['account-email']}>  {userDetails.email} </h3>
            </div>
            <button onClick={handleLogout} className={styles['logout-button']}>
              Logout
            </button>
          </div>

          <div className={styles['trips-box']}>
            <h3 className={styles['trips-title']}>My Trips!</h3>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Account;
