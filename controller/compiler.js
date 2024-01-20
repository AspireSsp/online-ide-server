var compiler = require('compilex');
const { createFile, removeFile } = require('../utills/createNewFile');
const { executeCode } = require('../utills/exicuteCode');
var options = {stats : true}; //prints stats on console 
compiler.init(options);

exports.compile = async (req, res) => {
    try {
        const {code, input, language} = req.body;
        console.log(req.body);

        var envData = { OS : "windows"}; 
        // var envData = { OS : "linux" }; 
        compiler.flush(()=>{
            console.log("deleted....!");
        })

        switch (language) {
            case 'python':
                if(input){
                    compiler.compilePythonWithInput( envData , code , input ,  function(data){
                        res.send(data);        
                    });
                }else{
                    compiler.compilePython( envData , code , function(data){
                        res.send(data);
                    });   
                }
            break;
            case 'cpp'||'c':
                envData.cmd = "g++";
                if(input){
                    compiler.compileCPPWithInput(envData , code , input , function (data) {
                        if(data.error)
                        {
                            res.send(data.error);    		
                        }
                        else
                        {
                            res.send(data.output);
                        }
                    });
                }else{
                    compiler.compileCPP(envData , code , function (data) {
                        if(data.error)
                        {
                            res.send(data.error);    		
                        }
                        else
                        {
                            res.send(data.output);
                        }
                    });
                }
            break;
            case 'java':
                if(input){
                    compiler.compileJavaWithInput( envData , code , input ,  function(data){
                        res.send(data);
                    });
                }else{
                    compiler.compileJava( envData , code , function(data){
                        res.send(data);
                    });   
                }
            break;
        }
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}

exports.compileCode = async(req, res)=>{
    try {
        const {code, input, language} = req.body;

        const filePath = await createFile(language, code);

        const output = await executeCode(language, filePath);
        await removeFile(filePath);
        res.status(200).json(
            {
                file : filePath,
                output
            }
        )
    } catch (error) {
        res.status(500).json(
            { 
                error: 'Internal Server Error', 
                message: error.message
            }
        );
    }
}