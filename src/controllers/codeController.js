const CodeSession = require("../models/codeSession");
const CodeFile = require("../models/codeFile");

const createCodeSession = async (req, res) => {
  try {
    const session = await CodeSession.create({
      roomId: req.body.roomId,
      project: req.body.project,
      language: req.body.language,
      owner: req.user._id,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNewFile = async (req, res) => {
  try {
    const file = await CodeFile.create({
      session: req.body.session,
      filename: req.body.filename,
      language: req.body.language,
      content: req.body.content || "",
    });

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const save = async (req, res) => {
  try {
    const file = await CodeFile.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ message: "Code file not found" });
    }

    res.json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCodeSession,
  createNewFile,
  save,
};
