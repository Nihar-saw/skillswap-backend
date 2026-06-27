const { Server } = require("socket.io");
const { setSocketIO } = require("../config/socket");

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    setSocketIO(io);

    io.on("connection", (socket) => {
        console.log(`User Connected : ${socket.id}`);

        require("./chatSocket")(io, socket);
        require("./notificationSocket")(io, socket);
        require("./activitySocket")(io, socket);
        require("./projectSocket")(io, socket);
        require("./taskSocket")(io,socket);
        require("./aiManagerSocket")(io, socket);
        require("./meetingSocket")(io, socket);
        require("./screenShareSocket")(io, socket);
        require("./whiteboardSocket")(io, socket);
        require("./codeSocket")(io,socket);
        socket.on("disconnect", () => {
            console.log(`Disconnected : ${socket.id}`);
        });
    });
};

const getIO = () => io;

module.exports = {
    initializeSocket,
    getIO
};