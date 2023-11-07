const express = require('express');
const teacherTask = require('./teacherTask')
const studentTask = require('./studentTask')
const auth = require('./auth')
const authenticate = require('../services/authentication');
const authorization = require('../services/authorization');
const indexRouter = require('../controllers/studentRouter');


const studentRouter = require('./studentRouter');
const teacherRouter = require('./teacherRouter');

const router = express.Router();

//index 
router.get('/', indexRouter.homepage);

//Student Routes
router.use('/student', studentRouter);

//Teacher Routes
router.use('/teacher', teacherRouter);

// Api Endpoints
router.use('/api/auth', auth);
router.use('/api/teacher/task', authenticate,  authorization('teacher'), teacherTask);
router.use('/api/student/task', authenticate,  authorization('student'), studentTask);


module.exports = router;