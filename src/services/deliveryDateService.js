function deliveryDate(distance) {

    //console.log(new Date().toLocaleString({ timeZone: 'Europe/Moscow' }))
    let deliveryDate = new Date().toJSON().split("T")[0];
    return (deliveryDate)

}

module.exports = { deliveryDate };