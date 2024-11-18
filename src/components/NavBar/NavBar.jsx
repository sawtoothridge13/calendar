import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          ShopNow
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/products">Home</a>
          </li>
          <li>
            <a href="/EventPage">Event Details</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
