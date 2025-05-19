const express = require('express');
const {refreshToken,Register,Login} = require('../controllers/auth.controller');

const router = express.Router() ; 

router.post("/register", Register); 
router.post("/login",Login);
router.get("/refresh-token", refreshToken);

module.exports = router ; 