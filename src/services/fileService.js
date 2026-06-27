const File = require("../models/File");

const saveFile = (fileData) => {
  return File.create(fileData);
};

const getProjectFiles = (projectId) => {
  return File.find({ project: projectId })
    .populate("uploadedBy", "name email")
    .sort({ createdAt: -1 });
};

module.exports = {
  saveFile,
  getProjectFiles,
};
