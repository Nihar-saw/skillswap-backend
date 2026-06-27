const users = new Map();

const addUser = (
    userId,
    socketId
) => {

    users.set(
        userId,
        socketId
    );

};

const removeUser = (
    socketId
) => {

    for (const [
        id,
        socket,
    ] of users.entries()) {

        if (
            socket === socketId
        ) {

            users.delete(id);

        }

    }

};

const getOnlineUsers =
() => {

    return Array.from(
        users.keys()
    );

};

module.exports = {

    addUser,

    removeUser,

    getOnlineUsers,

};