const similarity =
require("string-similarity");

const calculateSkillMatch = (
required,
candidate
)=>{

let score=0;

required.forEach(skill=>{

candidate.forEach(userSkill=>{

const result =
similarity.compareTwoStrings(

skill.toLowerCase(),

userSkill.toLowerCase()

);

if(result>0.7){

score++;

}

});

});

return Math.round(

(score/required.length)*100

);

};

module.exports={
calculateSkillMatch
};