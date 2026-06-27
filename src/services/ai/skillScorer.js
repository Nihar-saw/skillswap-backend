const scoreUser=(user)=>{

let score=0;

score+=user.skills.length*10;

score+=user.trustScore;

return score;

};

module.exports={
scoreUser
};