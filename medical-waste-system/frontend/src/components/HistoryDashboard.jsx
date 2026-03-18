
import { useEffect, useState } from "react";
import axios from "axios";
import { FaHistory } from "react-icons/fa";

function HistoryDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setData(res.data.filter((d) => d.status === "Disposed"));
    } catch (err) {
      setError("Failed to load history.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card history-card fade-in-card">
      <h3><FaHistory style={{color:'#2563eb'}}/> History</h3>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && data.length === 0 && <p>No disposed waste found.</p>}
      <div className="history-list">
        {!loading && !error && data.map((d) => (
          <div key={d.id} className="history-item-card fade-in-card">
            <div className="history-item-row"><b>Type:</b> {d.type}</div>
            <div className="history-item-row"><b>Disposal Section:</b> {d.section}</div>
            <div className="history-item-row"><b>Status:</b> {d.status}</div>
            <div className="history-item-row"><b>Uploaded:</b> {new Date(d.time).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryDashboard;
