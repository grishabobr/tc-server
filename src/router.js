const express = require('express');
const router = express.Router();
const priceController = require('./controllers/priceController');
const orderController = require('./controllers/orderController');
const statusController = require('./controllers/statusController');


router.post('/getPrice', priceController.calculate);

router.post('/createOrder', orderController.create);
router.get('/readOrder/:orderNumber', orderController.read);
router.put('/updateOrder/:orderNumber', orderController.update);
router.delete('/deleteOrder/:orderNumber', orderController.del);

router.post('/statusCheck', statusController.check);


module.exports = router;


