import { useEffect, useState } from "react";
import axios from "axios";

function exportAuditToCSV(auditLog) {
  const header = ["Action", "Type", "Time", "Waste ID"];
  const rows = auditLog.map(log => [log.action, log.type, new Date(log.time).toLocaleString(), log.wasteId]);
  let csv = header.join(",") + "\n" + rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "compliance_report.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function CompliancePanel() {
  const [compliance, setCompliance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompliance = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:5000/api/compliance");
        setCompliance(res.data);
      } catch (err) {
        setError("Failed to load compliance status.");
      }
      setLoading(false);
    };
    fetchCompliance();
  }, []);

  return (
    <div className="card compliance-card">
      <h3>🏥 Hospital Compliance Panel</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {compliance && (
        <>
          <p style={{fontWeight:600}}>
            <b>Status:</b> {compliance.status === "Compliant" ? <span style={{color: 'green'}}>✅ Compliant</span> : <span style={{color: 'orange'}}>⚠️ Warning</span>}
          </p>
          <div>
            <b>Audit Log:</b>
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Waste ID</th>
                </tr>
              </thead>
              <tbody>
                {compliance.auditLog.length === 0 && (
                  <tr><td colSpan={4}>No audit records.</td></tr>
                )}
                {compliance.auditLog.map((log, idx) => (
                  <tr key={idx}>
                    <td>{log.action}</td>
                    <td>{log.type}</td>
                    <td>{new Date(log.time).toLocaleString()}</td>
                    <td>{log.wasteId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="report-btn" onClick={() => exportAuditToCSV(compliance.auditLog)}>
            Export Compliance Report (CSV)
          </button>
        </>
      )}
    </div>
  );
}
