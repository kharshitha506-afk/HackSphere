
import { useEffect, useState } from "react";
import axios from "axios";
import { FaLeaf, FaCheckCircle } from "react-icons/fa";

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
    <div className="card sustainability-card fade-in-card">
      <h3><FaLeaf style={{color:'#22c55e'}}/> Sustainability</h3>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {metrics && (
        <>
          <div className="sustainability-metric-row">
            <span>Total Waste Processed</span>
            <span className="sustainability-metric-value">{metrics.total}</span>
          </div>
          <div className="sustainability-metric-row">
            <span>Recycled</span>
            <span className="sustainability-metric-value">{metrics.percentRecycled}%</span>
          </div>
          <div className="sustainability-progress-bar">
            <div style={{width: metrics.percentRecycled + '%'}}/>
          </div>
          <div className="sustainability-metric-row">
            <span>Disposed</span>
            <span className="sustainability-metric-value">{metrics.disposed}</span>
          </div>
          <div className="sustainability-metric-row">
            <span>CO₂ Saved</span>
            <span className="sustainability-metric-value">{metrics.co2Saved} kg</span>
          </div>
          <div className="sustainability-metric-row">
            <span>Plastic Recycled</span>
            <span className="sustainability-metric-value">{metrics.plasticRecycled} kg</span>
          </div>
          <div className="eco-message eco-badge"><FaCheckCircle style={{color:'#22c55e',marginRight:6}}/>Eco-friendly Hospital</div>
        </>
      )}
    </div>
  );
}
