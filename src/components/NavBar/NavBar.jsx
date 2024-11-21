/**
 * NavBar component displays a navigation bar with links to the Calendar View and Add Event pages.
 */

import './NavBar.css';
import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar">
      {/* Left Section: Logo */}
      <div className="navbar-left">
        <a href="/" className="logo">
          Challenge Events
        </a>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/">Calendar View</a>
          </li>
          <li>
            <a href="/AddEventPage">Add Event</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
