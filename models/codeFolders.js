const mongoose = require("mongoose");


const codeFolderSchema = new mongoose.Schema({
    folderName: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
},{
    timestamps: true
});
  
const CodeFolder = mongoose.model('CodeFolder', codeFolderSchema);

module.exports = CodeFolder;