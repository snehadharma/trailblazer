import React from "react";
import styles from './Header.module.css';
import '../App.css';

const Header = () => {	
    return (
      <div className={styles.header}>
        <div className={styles.trailblazer}>trailblazer</div>
        <div className = {styles.container}>
          <div className={styles.logIn}>log in</div>
          <div className={styles.signUp}>sign up</div>
          <div className={styles.home}>home</div>
        </div>
      </div>)
            
};

export default Header;
