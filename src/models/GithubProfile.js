const mongoose = require("mongoose");

const githubProfileSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    username:String,

    avatar:String,

    bio:String,

    followers:Number,

    following:Number,

    publicRepos:Number,

    repositories:[
        {
            name:String,
            url:String,
            language:String,
            stars:Number,
            forks:Number
        }
    ]

},{
    timestamps:true
});

module.exports =
mongoose.model(
"GithubProfile",
githubProfileSchema
);