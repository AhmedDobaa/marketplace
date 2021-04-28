var express= require('express');
const router= express.Router();
var controller= require('../controller/users.controller');
var validate= require('../utils/validation');
var jwtUtil = require('../utils/jwt');



router.post('/register', validate.validateRegister, controller.register);
router.get('/login', validate.validateLogin, controller.login);
router.put('/updateUserBalance', jwtUtil.verifyToken, validate.validateUpdateBalance, controller.updateUserBalance);

module.exports = router;