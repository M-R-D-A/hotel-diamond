const express = require('express');
const Auth = require('../../middleware/Auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const {
    controllerGetAll,
    controllerGetbyId,
    controllerAdd,
    controllerEdit,
    controllerDelete,
} = require('./user.controller');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image/foto/")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
});

let upload = multer({ storage: storage })

const verifyRoles = require("../../middleware/verifyRoles")

router.get('/', Auth, verifyRoles('admin'), controllerGetAll )
router.get('/:id', Auth, verifyRoles('admin'), controllerGetbyId )
router.post('/', Auth, verifyRoles('admin'), upload.single('foto'), controllerAdd )
router.put('/:id', Auth, verifyRoles('admin'), upload.single('foto'), controllerEdit )
router.delete('/:id', Auth, verifyRoles('admin'), controllerDelete )

module.exports = router;