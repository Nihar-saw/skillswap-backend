module.exports = (io, socket) => {

    socket.on("send-notification", (notification) => {

        io.to(notification.userId)
            .emit("new-notification", notification);

    });

};