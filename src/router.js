const express = require('express');
const router = express.Router();
const priceController = require('./controllers/priceController');
const orderController = require('./controllers/orderController');


router.post('/getPrice', priceController.calculate);

router.post('/createOrder', orderController.create);





module.exports = router;


