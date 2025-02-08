import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import './SignUp.css'; // Import SignUp-specific styles

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      navigate('/trailblazer');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignup}>


        <div className="input-container">
          <label className="label">First name</label>
          <input
            type="text"
            className="input"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label className="label">Last name</label>
          <input
            type="text"
            className="input"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="button">Sign Up</button>
      </form>

      <p>
        Already have an account? <a href="/login" className="link">Login</a>
      </p>
    </div>
  );
}

export default SignUp;
