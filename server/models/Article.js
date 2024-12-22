const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  category: { type: String },
  publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
