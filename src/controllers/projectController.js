const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      category: req.body.category,
      skillsRequired: req.body.skillsRequired,
      owner: req.user._id,
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
};