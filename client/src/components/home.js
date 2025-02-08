import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';

const Home = () => {
  return (
    <div>
        <p>hello world</p>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign Up</Link>
        </nav>
        
    </div>
  )
}

export default Home;
