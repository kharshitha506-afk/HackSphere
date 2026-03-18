// Basic controller.js for Healthcare Waste Management System

// In-memory waste data
let data = [];

exports.upload = (req, res) => {
  // Simulate upload and classification
  const now = new Date();
  const item = {
    id: data.length + 1,
    filename: req.file ? req.file.filename : "",
    originalname: req.file ? req.file.originalname : "",
    type: "General",
    section: "Ward",
    status: "Pending",
    time: now,
    recyclingDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
    isRecycled: false,
    audit: [
      { action: "Upload", time: now },
      { action: "Classified as General", time: now },
    ],
  };
  data.push(item);
  res.json(item);
};

exports.dashboard = (req, res) => {
  res.json(data);
};

exports.confirm = (req, res) => {
  const { id } = req.body;
  const item = data.find((i) => i.id === id);
  if (item) {
    item.status = "Disposed";
    item.audit.push({ action: "Disposed", time: new Date() });
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
};

exports.recycle = (req, res) => {
  const { id } = req.body;
  const item = data.find((i) => i.id === id);
  if (item) {
    item.status = "Recycled";
    item.isRecycled = true;
    item.audit.push({ action: "Recycled", time: new Date() });
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
};

exports.recyclingSchedule = (req, res) => {
  res.json({ schedule: "Every 2 days" });
};

exports.sustainability = (req, res) => {
  res.json({ score: 85, message: "Sustainable operations" });
};

exports.compliance = (req, res) => {
  // Gather all audit logs from waste data
  const auditLog = [];
  data.forEach(item => {
    if (item.audit && Array.isArray(item.audit)) {
      item.audit.forEach(log => {
        auditLog.push({
          action: log.action,
          type: item.type,
          time: log.time,
          wasteId: item.id
        });
      });
    }
  });
  res.json({
    status: "Compliant",
    auditLog
  });
};
