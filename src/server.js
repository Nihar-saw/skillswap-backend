require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const http = require("http");
const server = http.createServer(app);

connectDB();

const PORT = process.env.PORT || 5000;


const {
initializeSocket
} = require("./sockets");

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});