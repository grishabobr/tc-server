function price(orderParams, distance) {

    let price = 500+Number(orderParams.Width) + Number(orderParams.Height) + Number(orderParams.Length) + Number(orderParams.Weight) + distance;
    return (price)

}

module.exports = { price };