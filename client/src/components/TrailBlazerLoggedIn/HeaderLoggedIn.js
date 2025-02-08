import React from "react";
import { Link } from 'react-router-dom';
import styles from './HeaderLoggedIn.module.css';
import '../../App.css';

function Header () {	
    return (
      <div className={styles.header}>
        <div className={styles.trailblazer}>trailblazer</div>
        
        <div className = {styles.container}>
            <Link to="../GenerateTrip" className={styles.generateTrips}>generate trips</Link>
            <Link to="../Discover" className={styles.discover}>discover</Link>
            <Link to="../Account/Account" className={styles.account}>account</Link>
        </div>

      </div>)
            
};

export default Header;
