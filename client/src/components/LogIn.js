import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import cactusImage from '../assets/cacti.png'; // Import the image
import './LogIn.css'; // Import the correct CSS file

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/trailblazer');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header /> {Header}
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-input-container">
          <label className="login-label">Email Address</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-input-container">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">Log In</button>
        <p>
          Don't have an account? <a href="/signup" className="login-link">Sign up</a>
        </p>
      </form>
      <img src={cactusImage} alt="Cactus" className="img" />
    </div>
    </div>
  );
}

export default LogIn;

