const File =
require("../models/File");

const saveFile=
async(data)=>{

return await File.create(data);

};

module.exports={
saveFile
};