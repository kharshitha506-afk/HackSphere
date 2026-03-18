import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="navbar-topbar">
      <div className="navbar-title-area">
        <span className="navbar-title">AI Healthcare Waste Management</span>
      </div>
      <div className="navbar-profile">
        <FaUserCircle size={32} className="navbar-profile-icon" />
      </div>
    </header>
  );
}