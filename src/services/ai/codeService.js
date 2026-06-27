const CodeSession=
require("../models/CodeSession");

const CodeFile=
require("../models/CodeFile");

const createSession=
async(data)=>{

return await CodeSession.create(data);

};

const createFile=
async(data)=>{

return await CodeFile.create(data);

};

const saveCode=
async(id,content)=>{

return await CodeFile.findByIdAndUpdate(

id,

{

content

},

{

new:true

}

);

};

module.exports={

createSession,

createFile,

saveCode

};