const db = require('./dbService');


async function getAddressId(address) {
    var addr = await db.query('SELECT * from address where address = ? and \`index\` = ?;',
        [address.address, address.index]);

    let addressId;

    if (addr.length == 0) {
        addr = await db.query('INSERT INTO address (address, \`index\`) VALUES(?, ?);',
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
        'INSERT INTO status_log (order_number, \`date\`, status) VALUES(?, ?, ?)',
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


async function read(orderNumber) {

    const readOrder = await db.query('SELECT * FROM orders WHERE order_number = ?;', [orderNumber]);

    let response = 'not found';
    if (readOrder.length !=0) response = readOrder[0];
    
    return response;
}

async function update(orderNumber, orderParams) {

    const updateOrder = await db.query(
        `UPDATE orders
        SET from_id=?, to_id=?, \`length\`=?, width=?, height=?, weight=?, delicate=?, distance=?, price=?, delivery_date=?
        WHERE order_number=?;`,
        [
            orderParams.from_id, orderParams.to_id, orderParams.length, orderParams.width, orderParams.height,
            orderParams.weight, orderParams.delicate, orderParams.distance, orderParams.price,
            orderParams.delivery_date, orderNumber
        ]);

    let response = 'not found';
    if (updateOrder.affectedRows != 0) response = 'success';

    return response;
}

async function del(orderNumber) {

    const delOrder = await db.query('DELETE FROM orders WHERE order_number = ?;', [orderNumber]);

    let response = 'not found';
    if (delOrder.affectedRows != 0) response = 'success';

    return response;
}


module.exports = { create, read, update, del };