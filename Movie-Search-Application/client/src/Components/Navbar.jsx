import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand me-auto" href="/">🎬 MovieApp</a>

      {/* Hamburger toggle for small screens */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Centered Menu Items */}
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item px-2">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item px-2">
            <a className="nav-link" href="#">About Us</a>
          </li>
          <li className="nav-item px-2">
            <a className="nav-link" href="#">Contact Us</a>
          </li>
          <li className="nav-item px-2">
            <a className="nav-link" href="#">Account</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
