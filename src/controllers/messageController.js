const Message = require("../models/Message");

const sendMessage = async (req, res) => {
    try {

        const message =
            await Message.create({

                sender: req.user._id,

                receiver: req.body.receiver,

                roomId: req.body.roomId,

                project: req.body.project,

                startup: req.body.startup,

                message: req.body.message,

                attachments:
                    req.body.attachments || [],
            });

        const populated =
            await Message.findById(message._id)
                .populate(
                    "sender",
                    "name email"
                );

        res.status(201).json(populated);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getMessages = async (req, res) => {

    try {

        const messages =
            await Message.find({
                roomId: req.params.roomId,
            })
                .populate(
                    "sender",
                    "name email"
                )
                .sort({
                    createdAt: 1,
                });

        res.json(messages);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const editMessage = async(req,res)=>{

    const message=await Message.findById(req.params.id);

    if(!message){

        return res.status(404).json({
            message:"Message not found"
        });

    }

    if(message.sender.toString()!==req.user._id.toString()){

        return res.status(403).json({
            message:"Unauthorized"
        });

    }

    message.message=req.body.message;

    message.edited=true;

    await message.save();

    res.json(message);

};

const deleteMessage=async(req,res)=>{

    const message=await Message.findById(req.params.id);

    if(!message){

        return res.status(404).json({
            message:"Not Found"
        });

    }

    if(message.sender.toString()!==req.user._id.toString()){

        return res.status(403).json({
            message:"Unauthorized"
        });

    }

    message.deleted=true;

    message.message="This message was deleted";

    await message.save();

    res.json({
        success:true
    });

};

const pinMessage=async(req,res)=>{

    const message=await Message.findById(req.params.id);

    message.isPinned=true;

    await message.save();

    res.json(message);

};

const reactMessage=async(req,res)=>{

    const message=await Message.findById(req.params.id);

    message.reactions.push({

        user:req.user._id,

        emoji:req.body.emoji

    });

    await message.save();

    res.json(message);

};

const markRead=async(req,res)=>{

    const message=await Message.findById(req.params.id);

    message.status="read";

    await message.save();

    res.json(message);

};
module.exports = {

sendMessage,

getMessages,

editMessage,

deleteMessage,

pinMessage,

reactMessage,

markRead
};