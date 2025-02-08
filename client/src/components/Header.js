import React from "react";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"; 
import styles from './Header.module.css';
import '../App.css';

function Header () {	
    return (
      <div className={styles.header}>
        <Link to="/Home" className={styles.trailblazer}>trailblazer</Link>
        
        <div className = {styles.container}>
            <Link to="/Home" className={styles.home}>home</Link>
            <Link to="/LogIn" className={styles.logIn}>log in</Link>
            <Link to="/SignUp" className={styles.signUp}>sign up</Link>
        </div>

      </div>)
            
};

export default Header;
