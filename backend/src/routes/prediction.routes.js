const express = require("express");
const router = express.Router();

// GET predictions
router.get("/", (req, res) => {
  res.json({
    message: "Prediction route working",
    prediction: "Normal Operation"
  });
});

module.exports = router;