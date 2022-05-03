function price(orderParams) {

    let price = Number(orderParams.Width) + Number(orderParams.Height) + Number(orderParams.Length) + 1000000;
    return (price)

}

module.exports = { price };