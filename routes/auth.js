const express = require('express');
const route = express.Router();
const {loginTeacher, signupTeacher,loginStudent} = require('../controllers/authenticate');

route.post('/loginTeacher', loginTeacher);
route.post('/signupTeacher', signupTeacher);
route.post('/loginStudent', loginStudent);


module.exports = route