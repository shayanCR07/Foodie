const express = require("express");
const Menu = require("../model/Menu");
const router = express.Router();


const menuController = require('../controllers/menuController');
// get all menu items from database
router.get('/', menuController.getAllMenuItems)



module.exports = router;