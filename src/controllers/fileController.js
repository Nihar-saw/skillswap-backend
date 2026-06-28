const uploadToCloudinary = require("../utils/cloudinaryUpload");
const { saveFile } = require("../services/fileService");
const File = require("../models/File");
const uploadFile = async (req, res) => {
  try {
    const uploaded = await uploadToCloudinary(req.file);

    const file = await saveFile({
      project: req.body.project,
      uploadedBy: req.user._id,
      originalName: req.file.originalname,
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      size: req.file.size,
      mimeType: req.file.mimetype,
    });

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const query = req.query.project ? { project: req.query.project } : { uploadedBy: req.user._id };
    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name email")
      .populate("project", "title");
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile, getFiles };