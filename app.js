const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

app.use(cors({
  origin: '*',
  methods: ['POST', 'PUT', 'GET', 'PATCH','DELETE', 'HEAD'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set("trust proxy", 1)

app.use(cookieParser());

//route are import here..
const user = require("./routes/userRoutes");
const compiler = require("./routes/compiler");
const codeFile = require("./routes/codeFile");
const codeFolder = require("./routes/codeFolder");

app.use("/api/v1/compiler", compiler);
app.use("/api/v1/user/", user);
app.use("/api/v1/file/", codeFile);
app.use("/api/v1/folder/", codeFolder);

app.get("/", (req, res)=>{
  res.status(200).json({success : true, message : "server is running ..."})
})
module.exports = app;
