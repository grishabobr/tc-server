function deliveryDate(distance) {

    let deliveryDate = new Date();
    let lengthInDays = Math.floor(1 + distance / 300);
    deliveryDate.setDate(deliveryDate.getDate() + lengthInDays);
    return (deliveryDate.toJSON().split("T")[0])

}

module.exports = { deliveryDate };