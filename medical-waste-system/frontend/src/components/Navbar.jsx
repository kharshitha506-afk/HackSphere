import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar-pro">
      <div className="nav-left">
        <span className="nav-logo">🏥</span>
        <span className="nav-title">Nova Specialist Hospital</span>
      </div>
      <div className="nav-menu">
        <a href="#dashboard">Dashboard</a>
        <a href="#recycling">Recycling</a>
        <a href="#sustainability">Sustainability</a>
        <a href="#compliance">Compliance</a>
        <div className="nav-dropdown">
          <span>More ▼</span>
          <div className="dropdown-content">
            <a href="#history">History</a>
            <a href="#upload">Upload Waste</a>
          </div>
        </div>
      </div>
      <button className="nav-cta">Book Appointment</button>
    </nav>
  );
}