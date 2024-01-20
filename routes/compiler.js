const express = require('express');
const { compile, compileCode } = require('../controller/compiler');
const router = express.Router();

router.route("/compiler").post(compile)
router.route("/run").post(compileCode);


module.exports = router; 

