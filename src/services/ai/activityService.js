const Activity = require("../models/Activity");

const createActivity = async(data)=>{

    const activity =
    await Activity.create(data);

    return activity;

};

module.exports = {
    createActivity
};