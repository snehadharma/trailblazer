import React from 'react';
import Header from './TrailBlazerLoggedIn/HeaderLoggedIn';
import styles from './Discover.module.css';
import texas1 from "../assets/texas1.jpeg";
import texas2 from "../assets/texas2.jpeg";
import texas3 from "../assets/texas3.jpeg";
import texas4 from "../assets/texas4.jpeg";
import texas5 from "../assets/texas5.jpeg";
import texas6 from "../assets/texas6.jpeg";
import texas7 from "../assets/texas7.jpeg";
import texas8 from "../assets/texas8.jpeg";


function Discover() {
  return (
    <div>
      < Header /> {Header}

      <div className = {styles.rectangle}>
        <div className = {styles.subRect}> 
          <div className={styles.trip} data-description="@snehalikesbbq">
            <img src={texas1} alt="Trip1" />
          </div>
          <div className={styles.trip} data-description="@riannatravels">
            <img src={texas2} alt="Trip2" />
          </div>
          <div className={styles.trip} data-description="@oliviaontheroad">
            <img src={texas3} alt="Trip3" />
          </div>
          <div className={styles.trip} data-description="@awaywithaanya">
            <img src={texas4} alt="Trip4" />
          </div>
        </div>
        <div className = {styles.subRect} data-description="@riannatravels">  
        <div className={styles.trip}>
            <img src={texas5} alt="Trip5" />
          </div>
          <div className={styles.trip} data-description="@awaywithaanya">
            <img src={texas6} alt="Trip6" />
          </div>
          <div className={styles.trip} data-description="@snehalikesbbq">
            <img src={texas7} alt="Trip7" />
          </div>
          <div className={styles.trip} data-description="@oliviaontheroad">
            <img src={texas8} alt="Trip8" />
          </div>
        </div>
      <div className = {styles.subRect}> 
          <div className={styles.trip} data-description="@snehalikesbbq">
            <img src={texas1} alt="Trip1" />
          </div>
          <div className={styles.trip} data-description="@riannatravels">
            <img src={texas2} alt="Trip2" />
          </div>
          <div className={styles.trip} data-description="@oliviaontheroad">
            <img src={texas3} alt="Trip3" />
          </div>
          <div className={styles.trip} data-description="@awaywithaanya">
            <img src={texas4} alt="Trip4" />
          </div>
        </div>
        <div className = {styles.subRect} data-description="@riannatravels">  
        <div className={styles.trip}>
            <img src={texas5} alt="Trip5" />
          </div>
          <div className={styles.trip} data-description="@awaywithaanya">
            <img src={texas6} alt="Trip6" />
          </div>
          <div className={styles.trip} data-description="@snehalikesbbq">
            <img src={texas7} alt="Trip7" />
          </div>
          <div className={styles.trip} data-description="@oliviaontheroad">
            <img src={texas8} alt="Trip8" />
          </div>
        </div>

      <div className = {styles.subRect}> 
          <div className={styles.trip} data-description="@snehalikesbbq">
            <img src={texas1} alt="Trip1" />
          </div>
          <div className={styles.trip} data-description="@riannatravels">
            <img src={texas2} alt="Trip2" />
          </div>
          <div className={styles.trip} data-description="@oliviaontheroad">
            <img src={texas3} alt="Trip3" />
          </div>
          <div className={styles.trip} data-description="@awaywithaanya">
            <img src={texas4} alt="Trip4" />
          </div>
        </div>
        <div className = {styles.subRect} data-description="@riannatravels">  
        <div className={styles.trip}>
            <img src={texas5} alt="Trip5" />
          </div>
          <div className={styles.trip} data-description="@awaywithaanya">
            <img src={texas6} alt="Trip6" />
          </div>
          <div className={styles.trip} data-description="@snehalikesbbq">
            <img src={texas7} alt="Trip7" />
          </div>
          <div className={styles.trip} data-description="@oliviaontheroad">
            <img src={texas8} alt="Trip8" />
          </div>
        </div>
        </div>
    </div>
  );
}

export default Discover;