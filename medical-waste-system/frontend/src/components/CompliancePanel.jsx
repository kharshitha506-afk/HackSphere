
import { useEffect, useState } from "react";
import axios from "axios";
import { FaShieldAlt, FaCheckCircle, FaExclamationTriangle, FaDownload } from "react-icons/fa";

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

function CompliancePanel() {
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
    <div className="card compliance-card fade-in-card">
      <h3><FaShieldAlt style={{color:'#22c55e'}}/> Compliance Panel</h3>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {compliance && (
        <>
          <div className="compliance-status-row">
            <b>Status:</b>
            {compliance.status === "Compliant"
              ? <span className="status-badge status-recycled"><FaCheckCircle style={{marginRight:4}}/>Compliant</span>
              : <span className="status-badge status-pending"><FaExclamationTriangle style={{marginRight:4}}/>Warning</span>
            }
          </div>
          <div className="compliance-table-wrap">
            <div className="compliance-table-header">
              <b>Audit Log</b>
              <button className="report-btn" onClick={() => exportAuditToCSV(compliance.auditLog)}><FaDownload style={{marginRight:6}}/>Download</button>
            </div>
            <table className="audit-table compliance-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Waste ID</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(compliance.auditLog) && compliance.auditLog.length === 0 && (
                  <tr><td colSpan={4}>No audit records.</td></tr>
                )}
                {Array.isArray(compliance.auditLog) && compliance.auditLog.map((log, idx) => (
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

export default CompliancePanel;
