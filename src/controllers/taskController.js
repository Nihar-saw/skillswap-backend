const Task=require("../models/Task");

const createTask=async(req,res)=>{

const task=await Task.create({

project:req.body.project,

title:req.body.title,

description:req.body.description,

assignedTo:req.body.assignedTo,

createdBy:req.user._id,

priority:req.body.priority,

dueDate:req.body.dueDate

});

res.status(201).json(task);

};

const getTasks=async(req,res)=>{

const tasks=
await Task.find({

project:req.params.projectId

})

.populate("assignedTo","name")

.sort({

createdAt:-1

});

res.json(tasks);

};

const updateTask=async(req,res)=>{

const task=
await Task.findById(req.params.id);

task.status=req.body.status;

task.priority=req.body.priority;

task.assignedTo=req.body.assignedTo;

await task.save();

res.json(task);

};

module.exports={

createTask,

getTasks,

updateTask

};