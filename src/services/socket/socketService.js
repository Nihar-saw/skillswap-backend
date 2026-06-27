const { getSocketIO } = require("../../config/socket");

const emitToUser = (userId, event, data) => {
  const io = getSocketIO();
  if (io) {
    io.to(userId.toString()).emit(event, data);
  }
};

const emitToRoom = (roomId, event, data) => {
  const io = getSocketIO();
  if (io) {
    io.to(roomId).emit(event, data);
  }
};

const emitBroadcast = (event, data) => {
  const io = getSocketIO();
  if (io) {
    io.emit(event, data);
  }
};

module.exports = {
  emitToUser,
  emitToRoom,
  emitBroadcast,
};
