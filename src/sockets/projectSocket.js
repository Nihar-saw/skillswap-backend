module.exports = (io, socket) => {
    socket.on("join-project", (projectId) => {
        socket.join(`project_${projectId}`);
        console.log(socket.id, "joined project channel:", projectId);
    });

    socket.on("leave-project", (projectId) => {
        socket.leave(`project_${projectId}`);
    });

    socket.on("project-update", (data) => {
        io.to(`project_${data.projectId}`).emit("project-updated", data);
    });
};
