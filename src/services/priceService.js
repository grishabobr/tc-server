function price(orderParams, distance) {
    let delicate = orderParams.Delicate ? 2 : 1;
    let price = 500 + ((Number(orderParams.Width) * Number(orderParams.Height) * Number(orderParams.Length)) / 150 + 200 * Number(orderParams.Weight) + 10 * distance) / 5  * delicate;
    return (Math.round(price));

}

module.exports = { price };