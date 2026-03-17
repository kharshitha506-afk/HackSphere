const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("./controller");

// Multer setup for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});
const upload = multer({ storage });


router.post("/upload", upload.single("image"), controller.upload);
router.get("/dashboard", controller.dashboard);
router.post("/confirm", controller.confirm);

// New APIs
router.post("/recycle", controller.recycle);
router.get("/recycling-schedule", controller.recyclingSchedule);
router.get("/sustainability", controller.sustainability);
router.get("/compliance", controller.compliance);

module.exports = router;