const uploadProfilePic = require('../controllers/user.controller');
const express = require('express'); 
const router = express.Router() ; 
router.post('/',uploadProfilePic);


module.exports = router ; 
