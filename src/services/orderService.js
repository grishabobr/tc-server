const db = require('./dbService');

async function create(orderParams) {
    const result = await db.query(
        `INSERT INTO orders 
    (from_id, to_id, \`length\`, width, height, weight, delicate, distance, price, delivery_date)
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            //orderParams.addressFrom.address, orderParams.addressTo.address,
            33,34,
            orderParams.parameters.length, orderParams.parameters.width,
            orderParams.parameters.height, orderParams.parameters.weight,
            orderParams.parameters.delicate, orderParams.distance, orderParams.price,
            orderParams.deliveryDate
        ]
    );






    let orderNumberResponse = {
        orderNumber: "Error"
    };

    if (result.affectedRows) {
        orderNumberResponse = (await db.query('SELECT MAX(order_number) as orderNumber FROM orders;'))[0];
    };

    return orderNumberResponse;
}

module.exports = { create };