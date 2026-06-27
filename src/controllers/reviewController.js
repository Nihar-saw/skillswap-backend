const Review = require("../models/Review");

const createReview = async (
  req,
  res
) => {

  const review =
    await Review.create({
      reviewer: req.user._id,
      reviewee:
        req.body.reviewee,
      rating:
        req.body.rating,
      comment:
        req.body.comment
    });

  res.status(201).json(
    review
  );
};

module.exports = {
  createReview
};