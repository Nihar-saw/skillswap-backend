const {
matchUsers
}=require("../services/ai/teamMatcher");

const findTeam=
async(req,res)=>{

const users=
await matchUsers(

req.body.skills

);

res.json(users);

};

module.exports={
findTeam
};