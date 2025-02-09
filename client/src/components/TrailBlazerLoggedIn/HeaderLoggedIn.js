import React from "react";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png"; 
import styles from './HeaderLoggedIn.module.css';
import '../../App.css';

function Header () {
    return (
      <div className={styles.header}>
      <img className={styles.logo} src={logo} alt="star" />
        

        <Link to="/Home" className={styles.trailblazer}>trailblazer</Link>
        <Link to="/Trailblazer/GenerateTrip" className={styles.trailblazer}>trailblazer</Link>
        <div className = {styles.container}>
            <Link to="../Trailblazer/GenerateTrip" className={styles.generateTrip}>generate trips</Link>
            <Link to="../Trailblazer/Discover" className={styles.discover}>discover</Link>
            <Link to="../Trailblazer/Account" className={styles.account}>account</Link>
        </div>

      </div>)

};

export default Header;
