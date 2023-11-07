
const teacherRouter = require('../controllers/teacherRouter');
const authenticate = require('../services/authentication');
const authorization = require('../services/authorization');
const teachercontroller = require('../controllers/TeacherController');
const express = require('express');
const router  = express.Router();


router.get('/login', teacherRouter.login);
router.get('/signup', teacherRouter.signup);
router.get('/viewPanel', teacherRouter.viewPanel);
router.get('/addStudent',teacherRouter.addStudent);
router.post('/editStudent',teacherRouter.editStudent);
router.post('/deleteStudent',teachercontroller.deleteStudent);
router.get('/logout',teacherRouter.logout);

module.exports = router



