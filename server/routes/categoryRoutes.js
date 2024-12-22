const express = require("express");
const { getNewsByCategory } = require("../controllers/categoriesController");

const router = express.Router();

// Route: GET /api/categories/:category
router.get("/:category", getNewsByCategory);

module.exports = router;
