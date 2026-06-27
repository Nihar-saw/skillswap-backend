const GithubProfile =
require("../models/GithubProfile");

const {
getGithubProfile
} = require("../services/githubService");

const {
analyzeRepos
}=require("../utils/githubAnalyzer");

const connectGithub=
async(req,res)=>{

const data =
await getGithubProfile(
req.body.username
);

const languages=
analyzeRepos(
data.repos
);

const github=
await GithubProfile.create({

user:req.user._id,

username:data.profile.login,

avatar:data.profile.avatar_url,

bio:data.profile.bio,

followers:data.profile.followers,

following:data.profile.following,

publicRepos:data.profile.public_repos,

repositories:

data.repos.map(repo=>({

name:repo.name,

url:repo.html_url,

language:repo.language,

stars:repo.stargazers_count,

forks:repo.forks_count

}))

});

res.json({

github,

languages

});

};

module.exports={
connectGithub
};