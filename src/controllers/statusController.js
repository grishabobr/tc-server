const statusService = require('../services/statusService');

async function check(request, response, next) {

    try {
        response.send(await statusService.check((request.body.orderNumber).replace(/-/g, '')));
    } catch (err) {
        console.error('Error while checking status: ', err.message);
        next(err);
    }
}


module.exports = {
    check
};