import React from "react";
import { FaUserMd, FaHospitalAlt } from "react-icons/fa";
import './LandingPage.css';

export default function LandingPage({ onSelectRole }) {
  return (
    <div className="landing-gradient-bg">
      <div className="landing-center">
        <h1 className="landing-title">AI-Powered Healthcare Waste Management</h1>
        <div className="role-cards">
          <div className="role-card" onClick={() => onSelectRole('user')} tabIndex={0}>
            <div className="role-icon user"><FaUserMd size={48} /></div>
            <div className="role-label">User Portal</div>
          </div>
          <div className="role-card" onClick={() => onSelectRole('hospital')} tabIndex={0}>
            <div className="role-icon hospital"><FaHospitalAlt size={48} /></div>
            <div className="role-label">Hospital Management</div>
          </div>
        </div>
      </div>
    </div>
  );
}
