const db = require('./dbService');


async function getAddressId(address) {
    var addr = await db.query('SELECT * from address where address = ? and \`index\` = ?;',
        [address.address, address.index]);

    let addressId;

    if (addr.length == 0) {
        addr = await db.query('INSERT INTO tc_db.address (address, \`index\`) VALUES(?, ?);',
            [address.address, address.index]);
        addressId = addr.insertId;
    } else {
        addressId = addr[0].address_id;
    }
    return addressId;
}



async function create(orderParams) {

    let addressFromId = await getAddressId(orderParams.addressFrom);
    let addressToId = await getAddressId(orderParams.addressTo);
    console.log(addressFromId, addressToId)

    

    const orders = await db.query(
        `INSERT INTO orders 
    (from_id, to_id, \`length\`, width, height, weight, delicate, distance, price, delivery_date)
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            addressFromId, addressToId,
            orderParams.parameters.length, orderParams.parameters.width,
            orderParams.parameters.height, orderParams.parameters.weight,
            orderParams.parameters.delicate, orderParams.distance, orderParams.price,
            orderParams.deliveryDate
        ]
    );


    const statusLog = await db.query(
        'INSERT INTO tc_db.status_log (order_number, \`date\`, status) VALUES(?, ?, ?)',
        [orders.insertId, new Date().toJSON().split("T")[0], 'Created']
    );

    let orderNumberResponse = {
        orderNumber: "Error"
    };

    if (orders.affectedRows) {
        orderNumberResponse = (await db.query('SELECT MAX(order_number) as orderNumber FROM orders;'))[0];
    };

    return orderNumberResponse;
}

module.exports = { create };