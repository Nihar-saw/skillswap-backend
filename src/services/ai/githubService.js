const axios = require("axios");

const getGithubProfile = async(username)=>{

    const user =
    await axios.get(
        `https://api.github.com/users/${username}`
    );

    const repos =
    await axios.get(
        `https://api.github.com/users/${username}/repos`
    );

    return{

        profile:user.data,

        repos:repos.data

    };

};

module.exports={
    getGithubProfile
};