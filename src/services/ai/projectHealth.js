const calculateHealth = (data)=>{

    let score = 100;

    score -= data.pendingTasks * 2;

    score -= data.overdueTasks * 5;

    score -= data.openBugs * 3;

    score += data.completedTasks * 2;

    if(score>100)
        score=100;

    if(score<0)
        score=0;

    let risk="Low";

    if(score<80)
        risk="Medium";

    if(score<50)
        risk="High";

    return{

        score,

        risk,

        report:`Project Health: ${score}%`

    };

};

module.exports={
calculateHealth
};