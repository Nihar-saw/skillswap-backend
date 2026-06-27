const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Escrowed", "Released", "Refunded"],
      default: "Pending",
    },
    transactionType: {
      type: String,
      enum: ["Escrow", "Release", "Refund", "Transfer"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
