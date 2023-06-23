const express = require("express");
const multer = require('multer');
const {v4 : uuidv4} = require('uuid');
const path = require('path');


//panggil endpoint
const router = express.Router();
const {
    controllerWebLogin,
    } = require("./auth.controller")
//login
router.post("/login", controllerWebLogin),//login for web ireport

//export module
module.exports = router;
