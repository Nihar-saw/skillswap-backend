let ioInstance = null;

const setSocketIO = (io) => {
  ioInstance = io;
};

const getSocketIO = () => {
  if (!ioInstance) {
    try {
      const { getIO } = require("../sockets");
      ioInstance = getIO();
    } catch (e) {
      // socket not initialized yet
    }
  }
  return ioInstance;
};

module.exports = {
  setSocketIO,
  getSocketIO,
};
