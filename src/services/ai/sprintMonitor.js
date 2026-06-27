const monitorSprint = (tasks)=>{

const completed =
tasks.filter(
t=>t.status==="Completed"
).length;

const progress =
Math.round(
(completed/tasks.length)*100
);

return{

completed,

progress

};

};

module.exports={
monitorSprint
};