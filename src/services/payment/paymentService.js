const SkillWallet = require("../../models/SkillWallet");
const Payment = require("../../models/Payment");
const mongoose = require("mongoose");

const initializeWallet = async (userId) => {
  const existing = await SkillWallet.findOne({ user: userId });
  if (existing) return existing;
  return await SkillWallet.create({ user: userId, points: 100 });
};

const transferPoints = async (senderId, receiverId, amount, projectId = null, transactionType = "Transfer") => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const senderWallet = await SkillWallet.findOne({ user: senderId }).session(session);
    const receiverWallet = await SkillWallet.findOne({ user: receiverId }).session(session);

    if (!senderWallet) throw new Error("Sender wallet not found");
    if (!receiverWallet) throw new Error("Receiver wallet not found");
    if (senderWallet.points < amount) throw new Error("Insufficient wallet balance");

    senderWallet.points -= amount;
    receiverWallet.points += amount;

    await senderWallet.save({ session });
    await receiverWallet.save({ session });

    const payment = await Payment.create(
      [
        {
          sender: senderId,
          receiver: receiverId,
          amount,
          project: projectId,
          status: "Completed",
          transactionType,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return payment[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const escrowPoints = async (senderId, amount, projectId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const wallet = await SkillWallet.findOne({ user: senderId }).session(session);
    if (!wallet) throw new Error("Wallet not found");
    if (wallet.points < amount) throw new Error("Insufficient wallet balance");

    wallet.points -= amount;
    await wallet.save({ session });

    const payment = await Payment.create(
      [
        {
          sender: senderId,
          receiver: senderId, // System escrow hold
          amount,
          project: projectId,
          status: "Escrowed",
          transactionType: "Escrow",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return payment[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const releaseEscrow = async (projectId, receiverId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const escrowRecord = await Payment.findOne({
      project: projectId,
      status: "Escrowed",
      transactionType: "Escrow",
    }).session(session);

    if (!escrowRecord) throw new Error("No active escrow found for this project");

    const receiverWallet = await SkillWallet.findOne({ user: receiverId }).session(session);
    if (!receiverWallet) throw new Error("Receiver wallet not found");

    receiverWallet.points += escrowRecord.amount;
    await receiverWallet.save({ session });

    escrowRecord.status = "Released";
    await escrowRecord.save({ session });

    const payment = await Payment.create(
      [
        {
          sender: escrowRecord.sender,
          receiver: receiverId,
          amount: escrowRecord.amount,
          project: projectId,
          status: "Completed",
          transactionType: "Release",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return payment[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const refundEscrow = async (projectId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const escrowRecord = await Payment.findOne({
      project: projectId,
      status: "Escrowed",
      transactionType: "Escrow",
    }).session(session);

    if (!escrowRecord) throw new Error("No active escrow found for this project");

    const senderWallet = await SkillWallet.findOne({ user: escrowRecord.sender }).session(session);
    if (!senderWallet) throw new Error("Sender wallet not found");

    senderWallet.points += escrowRecord.amount;
    await senderWallet.save({ session });

    escrowRecord.status = "Refunded";
    await escrowRecord.save({ session });

    const payment = await Payment.create(
      [
        {
          sender: escrowRecord.sender,
          receiver: escrowRecord.sender,
          amount: escrowRecord.amount,
          project: projectId,
          status: "Completed",
          transactionType: "Refund",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return payment[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = {
  initializeWallet,
  transferPoints,
  escrowPoints,
  releaseEscrow,
  refundEscrow,
};
