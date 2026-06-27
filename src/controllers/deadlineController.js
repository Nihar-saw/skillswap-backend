const DeadlinePrediction = require("../models/DeadlinePrediction");
const { predictDeadline } = require("../services/ai/deadlinePredictor");

const parsePrediction = (prediction) => {
  if (typeof prediction !== "string") {
    return prediction;
  }

  try {
    return JSON.parse(prediction.replace(/```json|```/g, "").trim());
  } catch (error) {
    return {
      estimatedCompletion: new Date(),
      confidence: 50,
      delayProbability: 50,
      criticalTasks: [],
      recommendation: prediction,
    };
  }
};

const analyzeDeadline = async (req, res) => {
  try {
    const result = parsePrediction(await predictDeadline(req.body));

    const prediction = await DeadlinePrediction.create({
      project: req.body.project,
      estimatedCompletion: result.estimatedCompletion || req.body.currentDeadline || new Date(),
      confidence: result.confidence,
      delayProbability: result.delayProbability,
      teamVelocity: req.body.teamVelocity,
      criticalTasks: result.criticalTasks || [],
      recommendation: result.recommendation,
    });

    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrediction = async (req, res) => {
  try {
    const prediction = await DeadlinePrediction.findOne({
      project: req.params.projectId,
    }).sort({ createdAt: -1 });

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  analyzeDeadline,
  getPrediction,
};
