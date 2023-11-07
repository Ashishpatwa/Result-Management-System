const teacherController = require('../controllers/TeacherController.js');
const express = require('express');
const router  = express.Router();


router.post('/addStudent', teacherController.addStudent);
router.post('/updateStudent', teacherController.updateStudent);
router.post('/deleteStudent', teacherController.deleteStudent);
router.get('/getAllStudent', teacherController.getAllStudent);

module.exports = router


