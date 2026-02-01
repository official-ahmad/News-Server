const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    source: {
      id: String,
      name: String,
    },
    author: String,
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true, unique: true },
    urlToImage: String,
    publishedAt: Date,
    content: String,
    category: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
