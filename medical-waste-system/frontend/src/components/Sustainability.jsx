import { useEffect, useState } from "react";
import axios from "axios";

export default function Sustainability() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:5000/api/sustainability");
        setMetrics(res.data);
      } catch (err) {
        setError("Failed to load sustainability metrics.");
      }
      setLoading(false);
    };
    fetchMetrics();
  }, []);

  return (
    <div className="card sustainability-card">
      <h3>🌱 Sustainability Dashboard</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {metrics && (
        <>
          <p><b>Total Waste Processed:</b> {metrics.total}</p>
          <p><b>Recycled:</b> {metrics.percentRecycled}%</p>
          <p><b>Disposed:</b> {metrics.disposed}</p>
          <p><b>CO₂ Saved:</b> {metrics.co2Saved} kg</p>
          <p><b>Plastic Recycled:</b> {metrics.plasticRecycled} kg</p>
          <div className="eco-message">This hospital follows eco-friendly waste management practices 🌍</div>
        </>
      )}
    </div>
  );
}
