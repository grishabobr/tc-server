const orderService = require('../services/orderService');

async function create(request, response, next) {

    try {
        response.send(await orderService.create(request.body));
    } catch (err) {
        console.error('Error while creating order: ', err.message);
        next(err);
    }
}


module.exports = { create };