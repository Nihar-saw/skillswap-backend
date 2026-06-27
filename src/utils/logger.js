const info = (message, ...meta) => {
  console.log(`[INFO] [${new Date().toISOString()}]:`, message, ...meta);
};

const warn = (message, ...meta) => {
  console.warn(`[WARN] [${new Date().toISOString()}]:`, message, ...meta);
};

const error = (message, ...meta) => {
  console.error(`[ERROR] [${new Date().toISOString()}]:`, message, ...meta);
};

const debug = (message, ...meta) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[DEBUG] [${new Date().toISOString()}]:`, message, ...meta);
  }
};

module.exports = {
  info,
  warn,
  error,
  debug,
};
