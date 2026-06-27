const mongoose =
  require("mongoose");

const skillWalletSchema =
  new mongoose.Schema({
    user: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    points: {
      type: Number,
      default: 100
    }
  });

module.exports =
  mongoose.model(
    "SkillWallet",
    skillWalletSchema
  );