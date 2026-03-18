
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRecycle, FaCheckCircle, FaSyncAlt } from "react-icons/fa";

function RecyclingSection() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recycling, setRecycling] = useState(false);

  const fetchSchedule = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/recycling-schedule");
      setSchedule(res.data);
    } catch (err) {
      setError("Failed to load recycling schedule.");
    }
    setLoading(false);
  };

  const markAsRecycled = async (id) => {
    setRecycling(true);
    try {
      await axios.post("http://localhost:5000/api/recycle", { id });
      fetchSchedule();
    } catch (err) {
      setError("Failed to mark as recycled.");
    }
    setRecycling(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div className="card recycling-card fade-in-card">
      <h3><FaRecycle style={{color:'#22c55e'}}/> Recycling</h3>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {schedule && (
        <>
          <div className="recycling-date-row">
            <b>Next Recycling Date:</b> <span>{schedule.nextRecyclingDate ? new Date(schedule.nextRecyclingDate).toLocaleString() : "-"}</span>
          </div>
          <div className="recycling-items-list">
            <b>Items Scheduled:</b>
            {schedule.scheduledItems && schedule.scheduledItems.length === 0 && <p>No items scheduled.</p>}
            {schedule.scheduledItems && schedule.scheduledItems.map((item) => (
              <div key={item.id} className="recycling-item-card fade-in-card">
                <div className="recycling-item-row">
                  <span className="recycling-type">{item.type}</span>
                  {item.isRecycled
                    ? <span className="status-badge status-recycled"><FaCheckCircle style={{marginRight:4}}/>Recycled</span>
                    : <span className="status-badge status-pending"><FaSyncAlt style={{marginRight:4}}/>Pending</span>
                  }
                </div>
                <div className="recycling-item-row">
                  <span>Status: {item.status}</span>
                </div>
                <button className="dashboard-confirm-btn" onClick={() => markAsRecycled(item.id)} disabled={recycling || item.isRecycled}>
                  {item.isRecycled ? "Recycled" : recycling ? "Recycling..." : "Mark as Recycled"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RecyclingSection;
