import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Account from './components/Account/Account';
import TrailBlazerLoggedin from './components/TrailBlazerLoggedIn/TrailBlazerLoggedIn'


function App() {
  return (
    
    <Router>
      <p>app component take this out</p>
      {/* <nav>
        
        <Link to="/">Home</Link>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign Up</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path='/trailblazer/account' element={<Account />} />
        <Route path='/trailblazer' element={<TrailBlazerLoggedin />} />
      </Routes>
    </Router>
  );
}

export default App;
