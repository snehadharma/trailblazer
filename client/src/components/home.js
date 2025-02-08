import React from "react";
import Header from './Header';
import cactiImage from "../assets/cacti.png";
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { motion } from "framer-motion";


const Home = () => {	
  
  	return (
      <div>
        <Header />  {Header}
        <div className={styles.container}>
          <div className={styles.paragraphBounce}>welcome to...</div>
          <div className={styles.title}>Trailblazer</div>
          <div className={styles.paragraph}>an all-in-one texas road trip planner, fitted with an ai assistant.</div>
          <Link to="../LogIn" className={styles.button}>get started here!</Link>
        </div>
        <img className={styles.img} src={cactiImage} alt="Cacti" />
    </div>
    )
    		
};

export default Home;
