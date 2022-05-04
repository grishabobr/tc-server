const db = require('./dbService');


async function getStatusDate(status, orderNumber) {

    var statusInfo = await db.query('SELECT * from status_log where order_number = ? and status = ?;',
        [orderNumber, status]);
    
    let date = '0000-00-00';
    if (statusInfo.length != 0) {
        date = JSON.stringify(statusInfo[0].date).split('T')[0].substring(1);
    }

    return(date);
}

async function getDeliveryDate(orderNumber) {

    var dateInfo = await db.query('SELECT delivery_date from orders where order_number = ?',[orderNumber]);
    let date = JSON.stringify(dateInfo[0].delivery_date).split('T')[0].substring(1);

    return (date);
}



async function check(orderNumber) {

    let statusInfo = {
        status: {
            created: await getStatusDate('Created', orderNumber),
            processing: await getStatusDate('Processing', orderNumber),
            transit: await getStatusDate('Transit', orderNumber),
            delivered: await getStatusDate('Delivered', orderNumber)
        },
        deliveryDate: await getDeliveryDate(orderNumber)
    }

    return statusInfo;
}





module.exports = { check };