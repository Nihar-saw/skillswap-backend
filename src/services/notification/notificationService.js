const Notification = require("../../models/Notification");
const { emitToUser } = require("../socket/socketService");

const createNotification = async (data) => {
  try {
    const notification = await Notification.create({
      receiver: data.receiver,
      sender: data.sender,
      title: data.title,
      message: data.message,
      type: data.type || "system",
      link: data.link || "",
    });

    const populated = await Notification.findById(notification._id)
      .populate("sender", "name email");

    emitToUser(data.receiver, "new-notification", populated);

    return populated;
  } catch (error) {
    console.error("Failed to create/send notification:", error);
    throw error;
  }
};

module.exports = {
  createNotification,
};
