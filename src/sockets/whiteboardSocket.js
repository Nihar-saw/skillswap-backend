module.exports=(io,socket)=>{

socket.on(

"join-whiteboard",

(roomId)=>{

socket.join(roomId);

});

socket.on(

"draw",

({roomId,element})=>{

socket.to(roomId).emit(

"draw",

element

);

});

socket.on(

"erase",

({roomId,id})=>{

socket.to(roomId).emit(

"erase",

id

);

});

socket.on(

"cursor-move",

({roomId,cursor})=>{

socket.to(roomId).emit(

"cursor-move",

cursor

);

});

socket.on(

"undo",

(roomId)=>{

socket.to(roomId).emit(

"undo"

);

});

socket.on(

"redo",

(roomId)=>{

socket.to(roomId).emit(

"redo"

);

});

};