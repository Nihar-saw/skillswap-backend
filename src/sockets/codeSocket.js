module.exports=(io,socket)=>{

socket.on(

"join-editor",

(roomId)=>{

socket.join(roomId);

});

socket.on(

"code-change",

({roomId,content})=>{

socket.to(roomId).emit(

"code-change",

content

);

});

socket.on(

"cursor-change",

({roomId,cursor})=>{

socket.to(roomId).emit(

"cursor-change",

cursor

);

});

socket.on(

"file-open",

({roomId,file})=>{

socket.to(roomId).emit(

"file-open",

file

);

});

socket.on(

"typing",

(roomId)=>{

socket.to(roomId).emit(

"user-typing"

);

});

};