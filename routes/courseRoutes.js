const express = require('express');
const {createCourse} = require('../controllers/courseController');
const router = express.Router();
const upload = require('../utils/multer');

router.post('/create', upload.single('thumbnail'),createCourse);

module.exports = router;    