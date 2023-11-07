
const studentRouter = require('../controllers/studentRouter');
const express = require('express');
const authenticate = require('../services/authentication');
const authorization = require('../services/authorization');
const router  = express.Router();

router.get('/login', studentRouter.login);
router.get('/result', studentRouter.result);

module.exports = router
