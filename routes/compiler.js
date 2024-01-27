const express = require('express');
const { compile, compileCode } = require('../controller/compiler');
const router = express.Router();
// package comp
router.route("/compile").post(compile)
// server comp
router.route("/run").post(compileCode);


module.exports = router; 

