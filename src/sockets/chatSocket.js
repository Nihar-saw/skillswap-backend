const Message = require("../models/Message");

module.exports = (io, socket) => {
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(socket.id, "joined room", roomId);
    });

    socket.on("leave-room", (roomId) => {
        socket.leave(roomId);
    });

    socket.on("typing", (roomId) => {
        socket.to(roomId).emit("typing");
    });

    socket.on("stop-typing", (roomId) => {
        socket.to(roomId).emit("stop-typing");
    });

    socket.on("send-message", async (data) => {
        try {
            const message = await Message.create({
                sender: data.sender,
                receiver: data.receiver,
                roomId: data.roomId,
                message: data.message,
                project: data.project,
                startup: data.startup,
                attachments: data.attachments || [],
            });

            const populated = await Message.findById(message._id)
                .populate("sender", "name email");

            io.to(data.roomId).emit("receive-message", populated);
        } catch (error) {
            console.error("Socket send-message failed:", error);
            socket.emit("message-error", { message: error.message });
        }
    });

    socket.on("message-read", (id) => {
        io.emit("message-read", id);
    });

    socket.on("edit-message", (message) => {
        io.to(message.roomId).emit("message-edited", message);
    });

    socket.on("delete-message", (message) => {
        io.to(message.roomId).emit("message-deleted", message);
    });

    socket.on("pin-message", (message) => {
        io.to(message.roomId).emit("message-pinned", message);
    });

    socket.on("emoji-reaction", (message) => {
        io.to(message.roomId).emit("emoji-reaction", message);
    });
};