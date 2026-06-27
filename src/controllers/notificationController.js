const Notification =
require("../models/Notification");

const createNotification =
async(req,res)=>{

const notification=
await Notification.create({

receiver:req.body.receiver,

sender:req.user._id,

title:req.body.title,

message:req.body.message,

type:req.body.type,

link:req.body.link

});

res.status(201).json(notification);

};

const getNotifications=
async(req,res)=>{

const notifications=
await Notification.find({

receiver:req.user._id

})

.populate("sender","name")

.sort({

createdAt:-1

});

res.json(notifications);

};

const markAsRead=
async(req,res)=>{

const notification=
await Notification.findById(req.params.id);

notification.isRead=true;

await notification.save();

res.json(notification);

};

module.exports={

createNotification,

getNotifications,

markAsRead

};