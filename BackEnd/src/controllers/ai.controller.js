const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code; // fixed typo

    if (!code) {
      return res.status(400).send("Code is required");
    }

    const response = await aiService(code);

    res.send(response);
  } catch (error) {
    console.error("AI Service Error:", error);
    res.status(500).send("Something went wrong");
  }
};
