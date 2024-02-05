const express = require('express');
const { createFile, updateFile, deleteFile, getFile } = require('../controller/codeFiles');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/add").post(authenticate, createFile)
router.route("/update/:id").patch(authenticate, updateFile);
router.route("/delete/:id").delete(authenticate, deleteFile);
router.route("/get/:id").get(getFile);


module.exports = router; 