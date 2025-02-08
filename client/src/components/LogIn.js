import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './LogIn.css'; // Import the CSS file

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
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="title">Login</h2>

        <div className="input-container">
          <label className="label">Email Address</label>
          <input
            type="email"
            className="input"
            placeholder="Enter email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="button">Log In</button>
        <p>
        Don't have an account? <a href="/signup" className="link">Sign up</a>
        </p>
      </form>


    </div>
  );
}

export default LogIn;
