module.exports=(io,socket)=>{

socket.on(

"join-user",

(userId)=>{

socket.join(userId);

}

);

socket.on(

"send-notification",

(notification)=>{

io.to(notification.receiver)

.emit(

"new-notification",

notification

);

}

);

};