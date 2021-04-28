var express= require('express');
const router= express.Router();
var controller= require('../controller/products.controller');
var jwtUtil = require('../utils/jwt');
var validate= require('../utils/validation');

router.get('/getAllProducts', jwtUtil.verifyToken, controller.getAllProducts);

module.exports = router;