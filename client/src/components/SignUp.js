import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email.toString(), password.toString());
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, user, user.uid), {
          email: user.email, 
          firstName: fname,
          lastName: lname,
        });
      }
      console.log(user);
      console.log("Email:", email, "Password:", password);
      console.log("Type of email:", typeof email, "Type of password:", typeof password);
      navigate('/');
    } catch (error) {
      alert(error.message);
      console.log("error encountered on sign up");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>

        <label>First name</label>
        <div className="first_name"> 
          <input
            type="text"
            placeholder="first name"
            value={fname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <label>Last name</label>
        <div className="last_name"> 
          <input
            type="text"
            placeholder="last name"
            value={lname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <label>Email</label>
        <div className="email">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label>Password</label>
        <div className="pw"> 
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className = "submit_button">
              submit
          </button>
        </div>

      </form>

      

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default SignUp;