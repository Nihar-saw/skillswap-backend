module.exports=(io,socket)=>{

socket.on(

"start-screen-share",

({roomId,userId})=>{

io.to(roomId).emit(

"screen-share-started",

{

userId

}

);

});

socket.on(

"stop-screen-share",

(roomId)=>{

io.to(roomId).emit(

"screen-share-stopped"

);

});

socket.on(

"switch-screen",

({roomId})=>{

io.to(roomId).emit(

"screen-source-changed"

);

});

};