function deliveryDate(distance) {

    let deliveryDate = new Date().toJSON().split("T")[0];
    return (deliveryDate)

}

module.exports = { deliveryDate };