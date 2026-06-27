const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
    },

    skillsRequired: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);