const express = require("express");
const router = express.Router();

const {
  createArticles,
  getArticles,
  getSingleArticle,
  deleteArticle,
  fetchLiveNews,
} = require("../controllers/article.controller");

// ❗ ALL of these MUST be functions
router.get("/live-news", fetchLiveNews);
router.post("/", createArticles);
router.get("/", getArticles);
router.get("/:id", getSingleArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
