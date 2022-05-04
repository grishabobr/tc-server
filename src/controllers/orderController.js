const orderService = require('../services/orderService');

async function create(request, response, next) {

    try {
        response.send(await orderService.create(request.body));
    } catch (err) {
        console.error('Error while creating order: ', err.message);
        next(err);
    }
}

async function read(request, response, next) {

    try {
        response.send(await orderService.read(request.params.orderNumber));
    } catch (err) {
        console.error('Error while reading order: ', err.message);
        next(err);
    }
}

async function update(request, response, next) {

    try {
        response.send(await orderService.update(request.params.orderNumber, request.body));
    } catch (err) {
        console.error('Error while updating order: ', err.message);
        next(err);
    }
}

async function del(request, response, next) {

    try {
        response.send(await orderService.delete(request.params.orderNumber));
    } catch (err) {
        console.error('Error while deleting order: ', err.message);
        next(err);
    }
}



module.exports = { create, read, update, del };