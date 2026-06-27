const User = require("../../models/User");
const Review = require("../../models/Review");

const updateTrustScore = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    const reviews = await Review.find({ reviewee: userId });
    
    let score = 70; // Baseline trust score for registered members

    if (reviews.length > 0) {
      let totalRatingPoints = 0;
      reviews.forEach(r => {
        if (r.rating >= 4) {
          totalRatingPoints += (r.rating - 3) * 5; // Positive rating bump
        } else if (r.rating <= 2) {
          totalRatingPoints -= (3 - r.rating) * 10; // Negative rating penalty
        }
      });
      score += totalRatingPoints;
    }

    score = Math.max(0, Math.min(100, score));
    
    user.trustScore = score;
    await user.save();
    return score;
  } catch (error) {
    console.error("Failed to calculate trust score:", error);
    return null;
  }
};

module.exports = updateTrustScore;
