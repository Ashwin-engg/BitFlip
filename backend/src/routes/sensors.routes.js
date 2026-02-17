const express = require("express");
const router = express.Router();

// GET all sensor data
router.get("/", (req, res) => {
  res.json({
    message: "Sensors route working",
    status: "OK"
  });
});

// POST sensor data
router.post("/", (req, res) => {
  const sensorData = req.body;

  res.json({
    message: "Sensor data received",
    data: sensorData
  });
});

module.exports = router;