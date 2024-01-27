const CodeFile = require("../models/codeFiles");
// creating a new file
exports.createFile = async (req, res)=>{
    try {
        const{fileName, contentType} = req.body;
        if(!fileName || !contentType){
            return res.status(422).json(
                { 
                    error : "Unprocessable Entity",
                    message: !fileName ? "fileName is required." : "contentType is required" 
                }
            )
        }
        const file = await CodeFile.create({...req.body, userId: req.userId});
        res.status(200).json(
            { 
                success : true,
                message: "New file created successfully.", 
                file,
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
// updating a existing file
exports.updateFile = async (req, res)=>{
    try {
        const {id} = req.params;
        const file = await CodeFile.findById(id);
        if(!file){
            return res.status(404).json(
                {
                    error : 'Not Found',
                    message: 'file not found.' 
                }
            )
        }
        const updateFile = await CodeFile.findByIdAndUpdate(id, req,body);
        res.status(200).json(
            { 
                success : true,
                message: "file updated successfully.", 
                updateFile,
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
// delete a existing file
exports.deleteFile = async (req, res)=>{
    try {
        const {id} = req.params;

        const file = await CodeFile.findById(id);
        if(!file){
            return res.status(404).json(
                {
                    error : 'Not Found',
                    message: 'file not found.' 
                }
            )
        }
        const deleteFile = await CodeFile.findByIdAndDelete(id);
        res.status(200).json(
            { 
                success : true,
                message: "New file created successfully.", 
                deleteFile,
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
// get existing file
exports.getFile = async (req, res)=>{
    try {
        const {id} = req.params;

        const file = await CodeFile.findById(id);
        if(!file){
            return res.status(404).json(
                {
                    error : 'Not Found',
                    message: 'file not found.' 
                }
            )
        }
        res.status(200).json(
            { 
                success : true,
                message: "file successfully retrieved.", 
                file,
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