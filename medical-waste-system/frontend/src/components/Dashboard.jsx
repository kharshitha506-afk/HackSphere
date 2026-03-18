
import React from "react";
import { useWaste } from "../context/WasteContext";
import { FaFlask, FaSyringe, FaTrashAlt, FaBiohazard, FaCheckCircle, FaHourglassHalf, FaSyncAlt } from "react-icons/fa";

export default function Dashboard() {
  const { waste, loading, error, confirmWaste } = useWaste();
  const [confirming, setConfirming] = React.useState(null);
  const [filterType, setFilterType] = React.useState("All");
  const [filterStatus, setFilterStatus] = React.useState("All");

  const handleConfirm = async (id) => {
    setConfirming(id);
    await confirmWaste(id);
    setConfirming(null);
  };

  // Dropdown filter logic
  const wasteTypes = ["All", ...new Set(waste.map(w => w.type))];
  const wasteStatuses = ["All", ...new Set(waste.map(w => w.status))];
  const filteredWaste = waste.filter(w =>
    (filterType === "All" || w.type === filterType) &&
    (filterStatus === "All" || w.status === filterStatus)
  );

  // Icon for waste type
  const getTypeIcon = (type) => {
    if (/biohazard/i.test(type)) return <FaBiohazard className="waste-type-icon" style={{color:'#eab308'}} />;
    if (/syringe|needle/i.test(type)) return <FaSyringe className="waste-type-icon" style={{color:'#f87171'}} />;
    if (/chemical|lab/i.test(type)) return <FaFlask className="waste-type-icon" style={{color:'#38bdf8'}} />;
    if (/plastic|trash|bag/i.test(type)) return <FaTrashAlt className="waste-type-icon" style={{color:'#64748b'}} />;
    return <FaSyncAlt className="waste-type-icon" style={{color:'#2563eb'}} />;
  };

  // Badge for status
  const getStatusBadge = (status) => {
    if (/recycled/i.test(status)) return <span className="status-badge status-recycled"><FaCheckCircle style={{marginRight:4}}/>Recycled</span>;
    if (/pending/i.test(status)) return <span className="status-badge status-pending"><FaHourglassHalf style={{marginRight:4}}/>Pending</span>;
    if (/processed|disposed/i.test(status)) return <span className="status-badge status-processed"><FaSyncAlt style={{marginRight:4}}/>Processed</span>;
    return <span className="status-badge">{status}</span>;
  };

  return (
    <div className="card dashboard-card fade-in-card">
      <h3><FaTachometerAlt style={{color:'#2563eb'}}/> Dashboard</h3>
      <div className="dashboard-filters">
        <div>
          <label>Type:</label>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            {wasteTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            {wasteStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredWaste.length === 0 && <p>No waste items found.</p>}
      <div className="dashboard-list">
        {!loading && !error && filteredWaste.map((d) => (
          <div key={d.id} className={`dashboard-item-card status-${d.status.toLowerCase()} fade-in-card`}
            tabIndex={0}
            style={{ marginBottom: 18 }}>
            <div className="dashboard-item-header">
              {getTypeIcon(d.type)}
              <span className="dashboard-item-type">{d.type}</span>
              {getStatusBadge(d.status)}
            </div>
            <div className="dashboard-item-details">
              <div><b>Disposal Section:</b> {d.section}</div>
              <div><b>Uploaded:</b> {new Date(d.time).toLocaleString()}</div>
            </div>
            {d.status === "Pending" && (
              <button onClick={() => handleConfirm(d.id)} disabled={confirming === d.id} className="dashboard-confirm-btn">
                {confirming === d.id ? "Confirming..." : "Confirm Disposal"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
// ...existing code...