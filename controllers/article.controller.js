const Article = require("../models/Article");
const APIFeatures = require("../utils/apiFeatures");
const axios = require("axios"); // Axios import karna zaroori hai

// --- NAYA FUNCTION: NewsAPI se live data lene ke liye ---
exports.fetchLiveNews = async (req, res) => {
  try {
    // NewsAPI ko server-side se call kar rahay hain (Is se 426 error nahi ayega)
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: req.query.q || "bitcoin", // Frontend se query le ga, verna default bitcoin
        apiKey: process.env.NEWS_API_KEY, // Aapki key .env file mein honi chahiye
      },
    });

    res.status(200).json({
      success: true,
      articles: response.data.articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "NewsAPI se data nahi mil saka",
      error: error.message,
    });
  }
};

// --- BAAQI PURANA CODE ---

// POST /api/articles
exports.createArticles = async (req, res) => {
  const articles = await Article.insertMany(req.body.articles);
  res.status(201).json({ success: true, count: articles.length });
  console.log("Articles created successfully");
};

// GET /api/articles (Aapki DB se articles lane ke liye)
exports.getArticles = async (req, res) => {
  const resultPerPage = 10;
  const features = new APIFeatures(Article.find(), req.query).search();
  const articles = await features.query;

  res.json({
    success: true,
    count: articles.length,
    articles,
  });
};

// GET /api/articles/:id
exports.getSingleArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.json(article);
};

// DELETE /api/articles/:id
exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
