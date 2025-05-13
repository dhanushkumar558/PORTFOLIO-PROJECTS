// src/components/Navbar.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ onToggleDarkMode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
    onToggleDarkMode && onToggleDarkMode(darkMode);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Inventory Manager</a>
        <button className="btn btn-outline-primary" onClick={toggleMode}>
          {darkMode ? 'Day Mode ☀️' : 'Night Mode 🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
