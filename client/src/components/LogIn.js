import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div className = "email-login">
        <label>Email Address</label>
        <input
            type = "email"
            className = "form-control"
            placeholder = "enter email here"
            value = { email }
            onChange = {(e) => setEmail(e.target.value)}
        />
      </div>

      <div className = "pw-login">
        <label>Password</label>
        <input
            type = "password"
            className = "form-control"
            placeholder = "enter password here"
            value = { password }
            onChange = {(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button type="submit" className = "submit_button">
            submit
        </button>
      </div>
      
       <p>
        Don't have an account? <a href="/signup">Sign up</a>
       </p>

    </div>
  );
}

export default LogIn;