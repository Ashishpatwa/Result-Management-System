const studentController = require('../controllers/studentController');
const express = require('express');
const router  = express.Router();

router.post('/getStudentResult', studentController.getStudentResult);

module.exports = router