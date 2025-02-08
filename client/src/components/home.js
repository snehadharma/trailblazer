import React from "react";
import Header from './Header';
import styles from './Home.module.css';


const Home = () => {	
  
  	return (
      <div>
        <Header />  {Header}
        <div>
        <div className={styles.paragraph}>welcome to...</div>
        </div>
    </div>
    )
    		
};

export default Home;
