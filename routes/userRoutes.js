const express = require('express');
const { register, login } = require('../controller/user');
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)


module.exports = router; 































// const express = require('express');
// const { registerUser, loginUser } = require("../controller/userController");
// const router = express.Router();


// router.route("/register").post(registerUser)

// router.route("/login").post(loginUser)
 

// module.exports = router; 