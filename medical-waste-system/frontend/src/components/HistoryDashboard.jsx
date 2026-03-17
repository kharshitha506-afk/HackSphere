import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryDashboard() {
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
    <div className="card">
      <h3>History</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && data.length === 0 && <p>No disposed waste found.</p>}
      {!loading && !error && data.map((d) => (
        <div key={d.id} className="item">
          <p><b>Type:</b> {d.type}</p>
          <p><b>Disposal Section:</b> {d.section}</p>
          <p><b>Status:</b> {d.status}</p>
          <p><b>Uploaded:</b> {new Date(d.time).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
