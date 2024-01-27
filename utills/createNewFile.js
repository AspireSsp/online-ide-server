const path = require('path');
const fs = require('fs');
const {v4: uuid}  = require('uuid');

const dir = path.join(__dirname,"..", "codes");

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, {recursive: true})
}
const createFile = async(language, code)=>{
    let uniqueId = uuid();
    const fileName = `${uniqueId}.${language}`;
    console.log(fileName);
    const filePath = path.join(dir, fileName);
    await fs.writeFileSync(filePath, code);
    return filePath;
}

const removeFile = async(filePath)=>{
    fs.unlink(filePath, (err)=>{
        if (err) {
            console.error(`Error removing file: ${err.message}`);
        } else {
            console.log(`File ${filePath} has been successfully removed.`);
        }
    });
    fs.unlink(filePath.split('.')[0]+'.out', (err)=>{
        if (err) {
            console.error(`Error removing file: ${err.message}`);
        } else {
            console.log(`File ${filePath} has been successfully removed.`);
        }
    });
}

module.exports = {createFile, removeFile}