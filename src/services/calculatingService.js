const geoService = require('./geoService');
const priceService = require('./priceService');
const deliveryDateService = require('./deliveryDateService');



function calculate(orderParams) {

    let geoData = geoService.getGeoData(orderParams.From, orderParams.To);
    let priceResponse = {
        index: {
            indexFrom: geoData.indexFrom,
            indexTo: geoData.indexTo
        },
        distance: geoData.distance,
        price: priceService.price(orderParams),
        deliveryDate: deliveryDateService.deliveryDate(geoData.distance)
    }
    return priceResponse;
}

module.exports = { calculate };