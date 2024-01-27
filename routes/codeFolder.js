const express = require('express');
const { createFolder, updateFolder, deleteFolder, allFolder, allFolderWithFiles, getFolderDropdown } = require('../controller/codeFolders');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/add").post(authenticate, createFolder)
router.route("/all").get(authenticate, allFolder)
router.route("/all/files").get(authenticate, allFolderWithFiles)
router.route("/update/:id").patch(authenticate, updateFolder);
router.route("/delete/:id").delete(authenticate, deleteFolder);
router.route("/dropdown").get(getFolderDropdown);


module.exports = router; 