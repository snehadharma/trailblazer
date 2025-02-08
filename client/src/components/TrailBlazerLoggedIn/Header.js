import React from 'react';

function Header() {
  return (
    <div>
      <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign Up</Link>
        </nav>
    </div>
  );
}

export default Header;