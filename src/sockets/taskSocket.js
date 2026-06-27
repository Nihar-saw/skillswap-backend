module.exports=(io,socket)=>{

socket.on(

"join-project",

(projectId)=>{

socket.join(projectId);

});

socket.on(

"task-created",

(task)=>{

io.to(task.project)

.emit(

"new-task",

task

);

});

socket.on(

"task-updated",

(task)=>{

io.to(task.project)

.emit(

"update-task",

task

);

});

};