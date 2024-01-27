const express = require('express');
const { createFile, updateFile, deleteFile, getFile } = require('../controller/codeFiles');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/add").post(authenticate, createFile)
router.route("/update/:id").post(authenticate, updateFile);
router.route("/delete/:id").post(authenticate, deleteFile);
router.route("/get/:id").post(authenticate, getFile);


module.exports = router; 