const mongoose=require("mongoose");

const milestoneSchema=new mongoose.Schema({

project:{
type:mongoose.Schema.Types.ObjectId,
ref:"Project"
},

title:String,

description:String,

completed:{
type:Boolean,
default:false
},

deadline:Date

},
{
timestamps:true
});

module.exports=
mongoose.model(
"Milestone",
milestoneSchema
);