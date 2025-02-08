import React from "react";
import styles from './Home.module.css';
import '../App.css';

const Home = () => {	
  	return (
      <div className={styles.header}>
        <div className={styles.trailblazer}>trailblazer</div>
        <div className={styles.logIn}>log in</div>
        <div className={styles.signUp}>sign up</div>
        <div className={styles.active}>
        <div className={styles.home}>home</div>
        </div>
      </div>)
    		
};

export default Home;


// const Home = () => {
//   return (
//     <div>
//         <p>hello world</p>
//         <nav>
//             <Link to="/">Home</Link>
//             <Link to="/login">Log in</Link>
//             <Link to="/signup">Sign Up</Link>
//         </nav>
        
//     </div>
//   )
// }

// export default Home;
