const express = require("express");
const router = express.Router();

// GET equipment list
router.get("/", (req, res) => {
  res.json({
    message: "Equipment route working",
    equipment: []
  });
});

module.exports = router;