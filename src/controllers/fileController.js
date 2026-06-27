const uploadToCloudinary =
require("../utils/cloudinaryUpload");

const {
saveFile
}=require("../services/fileService");

const uploadFile=
async(req,res)=>{

const uploaded=
await uploadToCloudinary(
req.file
);

const file=
await saveFile({

project:req.body.project,

uploadedBy:req.user._id,

originalName:req.file.originalname,

url:uploaded.secure_url,

publicId:uploaded.public_id,

size:req.file.size,

mimeType:req.file.mimetype

});

res.status(201).json(file);

};

module.exports={
uploadFile
};