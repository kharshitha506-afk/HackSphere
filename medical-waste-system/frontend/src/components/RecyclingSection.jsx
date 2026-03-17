import { useEffect, useState } from "react";
import axios from "axios";

export default function RecyclingSection() {
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
    <div className="card recycling-card">
      <h3>♻️ Recycling Schedule</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {schedule && (
        <>
          <p><b>Next Recycling Date:</b> {schedule.nextRecyclingDate ? new Date(schedule.nextRecyclingDate).toLocaleString() : "-"}</p>
          <div>
            <b>Items Scheduled:</b>
            {schedule.scheduledItems && schedule.scheduledItems.length === 0 && <p>No items scheduled.</p>}
            {schedule.scheduledItems && schedule.scheduledItems.map((item) => (
              <div key={item.id} className="item">
                <p><b>Type:</b> {item.type}</p>
                <p><b>Status:</b> {item.status}</p>
                <button onClick={() => markAsRecycled(item.id)} disabled={recycling || item.isRecycled}>
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
