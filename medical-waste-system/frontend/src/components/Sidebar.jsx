import React from "react";
import { FaTachometerAlt, FaCloudUploadAlt, FaRecycle, FaLeaf, FaHistory, FaShieldAlt } from "react-icons/fa";
import "./Sidebar.css";

const menu = [
  { label: "Dashboard", icon: <FaTachometerAlt />, anchor: "#dashboard" },
  { label: "Upload Waste", icon: <FaCloudUploadAlt />, anchor: "#upload" },
  { label: "Recycling", icon: <FaRecycle />, anchor: "#recycling" },
  { label: "Sustainability", icon: <FaLeaf />, anchor: "#sustainability" },
  { label: "History", icon: <FaHistory />, anchor: "#history" },
  { label: "Compliance", icon: <FaShieldAlt />, anchor: "#compliance" },
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar-pro">
      <div className="sidebar-logo">Nova</div>
      <nav className="sidebar-menu">
        {menu.map((item, idx) => (
          <a
            key={item.label}
            href={item.anchor}
            className={active === idx ? "active" : ""}
            onClick={() => setActive(idx)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
