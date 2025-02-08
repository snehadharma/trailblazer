import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

function Header() {
  return (
    <div>
      <nav>
            <Link to="/trailblazer/generatetrip">generate trip</Link>
            <Link to="/trailblazer/discover">discover</Link>
            <Link to="/trailblazer/account">account</Link>
        </nav>
    </div>
  );
}

export default Header;