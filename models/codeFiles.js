const mongoose = require("mongoose");


const codeFileSchema = new mongoose.Schema({
    fileName: {
        type: String,
    },
    contentType: {
        type: String,
    },
    size: {
        type: Number,
    },
    data: {
        type: String,
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeFolder",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},{
    timestamps: true
});
  
const CodeFile = mongoose.model('CodeFile', codeFileSchema);

module.exports = CodeFile;