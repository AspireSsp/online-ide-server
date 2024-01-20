// In your execution module (e.g., executeCodeModule.js)
const { exec } = require('child_process');
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname,"..", "codes");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCode = async (language, filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    if(language=="cpp"){
        return new Promise((resolve, reject) => {
            exec(`g++ ${filePath} -o ${outPath} && ${path.join(outputPath, `${jobId}.out`)}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    }else if(language == "js"){
        return new Promise((resolve, reject) => {
            exec(`node ${filePath}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    }else if(language == "py"){
        return new Promise((resolve, reject) => {
            exec(`python ${filePath}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
                
            });
        });
    }
}

module.exports = { executeCode };
