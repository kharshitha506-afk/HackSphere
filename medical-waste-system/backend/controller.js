const { classify } = require("./ai");

// In-memory waste data
let data = [];

exports.upload = async (req, res) => {
  try {
    console.log("Upload endpoint hit.");
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const result = await classify();
    const now = new Date();
    const recyclingDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days later
    const item = {
      id: data.length + 1,
      filename: file.filename,
      originalname: file.originalname,
      type: result.type,
      section: result.section,
      status: "Pending",
      time: now,
      recyclingDate,
      isRecycled: false,
      audit: [
        { action: "Upload", time: now },
        { action: "Classified as " + result.type, time: now },
      ],
    };
    data.push(item);
    console.log("Waste item added:", item);
    res.json(item);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

exports.dashboard = (req, res) => {
  console.log("Dashboard endpoint hit.");
  res.json(data);
};

exports.confirm = (req, res) => {
  console.log("Confirm endpoint hit.");
  const { id } = req.body;
  const item = data.find((i) => i.id === id);
  if (item) {
    item.status = "Disposed";
    item.audit.push({ action: "Disposed", time: new Date() });
    // Simulate blockchain log
    console.log("Blockchain simulation:", item);
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
};

// Mark as recycled
exports.recycle = (req, res) => {
  console.log("Recycle endpoint hit.");
  const { id } = req.body;
  const item = data.find((i) => i.id === id);
  if (item) {
    item.isRecycled = true;
    item.status = "Recycled";
    item.audit.push({ action: "Recycled", time: new Date() });
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
};

// Recycling schedule logic
exports.recyclingSchedule = (req, res) => {
  const now = new Date();
  // Next recycling date is the soonest recyclingDate in the future
  const futureDates = data.filter(d => !d.isRecycled && d.recyclingDate > now).map(d => d.recyclingDate);
  const nextRecyclingDate = futureDates.length > 0 ? new Date(Math.min(...futureDates)) : null;
  // Items scheduled for next recycling
  const scheduledItems = data.filter(d => !d.isRecycled && d.recyclingDate && d.recyclingDate.getTime() === (nextRecyclingDate ? nextRecyclingDate.getTime() : 0));
  res.json({
    nextRecyclingDate,
    scheduledItems
  });
};

// Sustainability metrics
exports.sustainability = (req, res) => {
  const total = data.length;
  const recycled = data.filter(d => d.isRecycled).length;
  const disposed = data.filter(d => d.status === "Disposed").length;
  // Mock metrics
  const co2Saved = recycled * 2.5; // kg
  const plasticRecycled = data.filter(d => d.isRecycled && d.type === "Plastic").length * 1.2; // kg
  res.json({
    total,
    recycled,
    disposed,
    percentRecycled: total ? Math.round((recycled / total) * 100) : 0,
    co2Saved,
    plasticRecycled
  });
};

// Compliance panel
exports.compliance = (req, res) => {
  // Compliant if all pending waste is less than 3 days old
  const now = new Date();
  const pending = data.filter(d => d.status === "Pending");
  const warning = pending.some(d => (now - d.time) > 3 * 24 * 60 * 60 * 1000);
  const status = warning ? "Warning" : "Compliant";
  // Audit log: flatten all audits
  const auditLog = data.flatMap(d => d.audit.map(a => ({ ...a, wasteId: d.id, type: d.type })));
  res.json({
    status,
    auditLog
  });
};