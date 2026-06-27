const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup"
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        role: String
      }
    ]
  },
  { timestamps: true }
);

module.exports =
  mongoose.model(
    "Team",
    teamSchema
  );