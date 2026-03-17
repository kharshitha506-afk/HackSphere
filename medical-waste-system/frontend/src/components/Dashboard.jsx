import React from "react";
import { useWaste } from "../context/WasteContext";

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

  return (
    <div className="card">
      <h3>
        <span role="img" aria-label="dashboard">📊</span> Dashboard
      </h3>
      <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
        <div>
          <label style={{ fontWeight: 600, marginRight: 6 }}>Type:</label>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: "4px 10px", borderRadius: 6 }}>
            {wasteTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 600, marginRight: 6 }}>Status:</label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "4px 10px", borderRadius: 6 }}>
            {wasteStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredWaste.length === 0 && <p>No waste items found.</p>}
      {!loading && !error && filteredWaste.map((d) => (
        <div key={d.id} className={`item status-${d.status.toLowerCase()}`}
          style={{ marginBottom: 16, boxShadow: "0 1px 4px rgba(37,99,235,0.06)", borderRadius: 12, padding: "16px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>{d.type}</span>
            <span className={`status-badge status-${d.status.toLowerCase()}`}>{d.status}</span>
          </div>
          <p style={{ margin: "6px 0 0 0", fontSize: ".97rem" }}><b>Disposal Section:</b> {d.section}</p>
          <p style={{ margin: "2px 0 0 0", fontSize: ".97rem" }}><b>Uploaded:</b> {new Date(d.time).toLocaleString()}</p>
          {d.status === "Pending" && (
            <button onClick={() => handleConfirm(d.id)} disabled={confirming === d.id} style={{ marginTop: 10, borderRadius: 6, background: "#2563eb", color: "#fff", padding: "8px 18px", fontWeight: 600, border: "none", boxShadow: "0 1px 4px rgba(37,99,235,0.10)" }}>
              {confirming === d.id ? "Confirming..." : "Confirm Disposal"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}