import React from "react";
import { Link } from 'react-router-dom';
import styles from './HeaderLoggedIn.module.css';
import '../../App.css';

function Header () {
    return (
      <div className={styles.header}>
<<<<<<< HEAD
        <Link to="/Home" className={styles.trailblazer}>trailblazer</Link>

=======
        <Link to="/Trailblazer/GenerateTrip" className={styles.trailblazer}>trailblazer</Link>
        
>>>>>>> e862cc7c49c5946c53ecfc2bf361110cc2b22e9b
        <div className = {styles.container}>
            <Link to="../Trailblazer/GenerateTrip" className={styles.generateTrip}>generate trips</Link>
            <Link to="../Trailblazer/Discover" className={styles.discover}>discover</Link>
            <Link to="../Trailblazer/Account" className={styles.account}>account</Link>
        </div>

      </div>)

};

export default Header;
