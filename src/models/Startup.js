const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    startupName: {
      type: String,
      required: true,
    },

    idea: {
      type: String,
      required: true,
    },

    founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    requiredSkills: [
      {
        type: String,
      },
    ],

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    stage: {
      type: String,
      enum: [
        "Idea",
        "MVP",
        "Development",
        "Launched"
      ],
      default: "Idea",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Startup", startupSchema);