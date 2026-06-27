module.exports=(io,socket)=>{

socket.on(

"join-project",

(projectId)=>{

socket.join(projectId);

});

socket.on(

"ai-report",

(report)=>{

io.to(report.project)

.emit(

"new-ai-report",

report

);

});

};