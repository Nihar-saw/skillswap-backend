const prioritizeTasks=(tasks)=>{

return tasks.sort((a,b)=>{

const order={

Critical:4,

High:3,

Medium:2,

Low:1

};

return order[b.priority]-order[a.priority];

});

};

module.exports={
prioritizeTasks
};