const analyzeRepos=(repos)=>{

    const languages={};

    repos.forEach(repo=>{

        if(repo.language){

            languages[repo.language] =
            (languages[repo.language]||0)+1;

        }

    });

    return languages;

};

module.exports={
analyzeRepos
};