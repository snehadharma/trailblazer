import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/log_in';
import Signup from './components/sign_up';
import Home from './components/home';


function App() {
  return (
    <><p>hello world</p>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router></>
  );
}

export default App;
