const formatDateTime = (date) => {
  return new Date(date).toISOString();
};

const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return parseFloat((sum / reviews.length).toFixed(2));
};

const safeJsonParse = (str, fallback = {}) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
};

module.exports = {
  formatDateTime,
  calculateAverageRating,
  safeJsonParse,
};
