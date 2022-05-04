const calculatingService = require('../services/calculatingService');

async function calculate(request, response, next) {
    
    try {
        response.send(await calculatingService.calculate(request.body));
    } catch (err) {
        console.error(`Error while price calculating: `, err.message);
        next(err);
    }
}


module.exports = { calculate };