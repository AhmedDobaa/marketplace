var express= require('express');
const router= express.Router();
var controller= require('../controller/orders.controller');
let validate= require('../utils/validation');
var jwtUtil = require('../utils/jwt');

router.post('/requestProduct', jwtUtil.verifyToken, controller.requestProduct);
router.put('/cancelRequest', jwtUtil.verifyToken, controller.cancelRequest);
router.get('/getUserOrders', jwtUtil.verifyToken, controller.getUserOrders)

module.exports = router;