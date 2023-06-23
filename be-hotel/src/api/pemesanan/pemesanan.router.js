const express = require('express');
const Auth = require('../../middleware/Auth');

const router = express.Router();
const {
    controllerGetAll,
    controllerGetbyId,
    controllerAdd,
    controllerBooking,
    controllerEdit,
    controllerDelete,
} = require('./pemesanan.controller');


const verifyRoles = require("../../middleware/verifyRoles")

router.get('/', Auth, verifyRoles('admin'), controllerGetAll )
router.get('/:id', Auth, verifyRoles('admin'), controllerGetbyId )
router.post('/', Auth, verifyRoles('admin'), controllerAdd )
router.post('/booking', Auth, verifyRoles('admin'), controllerBooking )
router.put('/:id', Auth, verifyRoles('admin'), controllerEdit )
router.delete('/:id', Auth, verifyRoles('admin'), controllerDelete )

module.exports = router;