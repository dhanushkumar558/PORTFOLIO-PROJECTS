import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand me-auto" href="/">🎬 MovieApp</a>

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

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item px-2">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item px-2">
              <span className="nav-link" role="button" onClick={() => setShowAbout(true)}>About Us</span>
            </li>
            <li className="nav-item px-2">
              <span className="nav-link" role="button" onClick={() => setShowContact(true)}>Contact Us</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* About Modal */}
      {showAbout && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">About Us</h5>
                <button type="button" className="btn-close" onClick={() => setShowAbout(false)}></button>
              </div>
              <div className="modal-body">
                <p>This Movie App helps users filter and discover movies based on different attributes like industry, year, actor, genre, and rating. Built using React, Node.js, and MySQL.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Us</h5>
                <button type="button" className="btn-close" onClick={() => setShowContact(false)}></button>
              </div>
              <div className="modal-body">
                <p>📧 Email: support@movieapp.com<br />📞 Phone: +91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
