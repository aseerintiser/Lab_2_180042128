const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.controller');
const isLoggedIn = require('../middlewares/auth.middleware');

router.get('/', userController.getLandingPage);
router.get('/login', userController.getLoginPage);
router.get('/register', userController.getRegisterPage);
router.post('/register', userController.postRegisterPage);
router.post('/login', userController.postLoginPage);
router.get('/dashboard', isLoggedIn, userController.getDashboardPage);

module.exports = router;