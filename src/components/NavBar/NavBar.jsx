import './NavBar.css';
import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Challenge
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/">Calendar View</a>
          </li>
          <li>
            <a href="/EventDetailsPage">Event Details</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
