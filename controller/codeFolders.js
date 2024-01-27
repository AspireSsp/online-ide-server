const CodeFile = require("../models/codeFiles");
const CodeFolder = require("../models/codeFolders");


exports.createFolder = async (req, res)=>{
    try {
        const{folderName} = req.body;
        if(!folderName){
            return res.status(422).json(
                { 
                    error : "Unprocessable Entity",
                    message: "folderName is required" 
                }
            )
        }
        // console.log(req.body);
        const folder = await CodeFolder.create({...req.body, userId : req.userId});
        res.status(200).json(
            { 
                success : true,
                message: "New file created successfully.", 
                folder,
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
exports.updateFolder = async (req, res)=>{
    try {
        const {id} = req.params;
        const {folderName} = req.body;
        if(!folderName){
            return res.status(422).json(
                { 
                    error : "Unprocessable Entity",
                    message: "folderName is required" 
                }
            )
        }
        const myfolder = await CodeFolder.findById(id);
        if(!myfolder){
            return res.status(404).json(
                {
                    error : 'Not Found',
                    message: 'folder not found.' 
                }
            )
        }

        const folder = await CodeFolder.findByIdAndUpdate(id,req.body);
        res.status(200).json(
            { 
                success : true,
                message: "folder updated successfully.", 
                folder,
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
exports.deleteFolder = async (req, res)=>{
    try {
        const {id} = req.params;
        const folder = await CodeFolder.findById(id);

        if(!folder){
            return res.status(404).json(
                {
                    error : 'Not Found',
                    message: 'folder not found.' 
                }
            )
        }


        const deleteFolder = await CodeFolder.findByIdAndDelete(id);
        res.status(200).json(
            { 
                success : true,
                message: "folder deleted successfully.", 
                deleteFolder,
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
exports.allFolder = async (req, res)=>{
    try {
        const folders = await CodeFolder.find();
        res.status(200).json(
            { 
                success : true,
                message: "Folders successfully retrieved", 
                folders,
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
exports.allFolderWithFiles = async (req, res)=>{
    try {
        const folders = await CodeFolder.aggregate([
            {
                $match : {
                    userId : req.userId
                }
            },
            {
                $lookup: {
                  from: "codefiles", 
                  localField: "_id",
                  foreignField: "folderId",
                  as: "files"
                }
            }
        ])
        const files = await CodeFile.aggregate([
            {
                $match : {
                    userId : req.userId,
                    folderId: null,
                }
            },
        ])
        res.status(200).json(
            { 
                success : true,
                message: "Folders successfully retrieved", 
                data : [...folders, ...files],
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
exports.getFolderDropdown = async (req, res)=>{
    try {
        const folders = await CodeFolder.aggregate([
            {
                $project: {
                    value: '$_id', 
                    _id: 0,
                    label: '$folderName',
                }
            }
        ])
        res.status(200).json(
            { 
                success : true,
                message: "Folders successfully retrieved", 
                folders,
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