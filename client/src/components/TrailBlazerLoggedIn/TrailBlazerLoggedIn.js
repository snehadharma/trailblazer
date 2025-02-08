import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './HeaderLoggedIn';

function TrailBlazerLoggedIn() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default TrailBlazerLoggedIn;
