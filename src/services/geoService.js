mapboxgl = require('mapbox-gl');
MapboxClient = require('mapbox');
turf = require('turf');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Jpc2hhYm9iciIsImEiOiJja3c2amkxNG0wcjNiMnZsanBpMnl3dWo1In0.Au_BOiTQ03LDRItEm3Gx6A';
var client = new MapboxClient(mapboxgl.accessToken);


async function getGeoInfo(address) {
    let geoInfo = (await client.geocodeForward(address,{limit:1})).entity.features[0];
    return geoInfo;
}

function getDistance(geoInfoFrom, geoInfoTo) {
    let distance = Math.round(turf.distance(turf.point(geoInfoFrom.center), turf.point(geoInfoTo.center), "kilometers"));
    return distance;
}

async function getIndex(geoInfo) {
    let index = (await client.geocodeForward(geoInfo.center[0] + ', ' + geoInfo.center[1],{limit:1})).entity.features[0].context[0].text;
    return index;
}


async function getGeoData(from, to) {

    const geoInfoFrom = await getGeoInfo(from);
    const geoInfoTo = await getGeoInfo(to);

    var distance = getDistance(geoInfoFrom, geoInfoTo);;

    const indexFrom = await getIndex(geoInfoFrom);
    const indexTo = await getIndex(geoInfoTo);

    let geoData = {
        indexFrom: indexFrom,
        indexTo: indexTo,
        distance: distance
    };
    return geoData;
}




module.exports = { getGeoData }