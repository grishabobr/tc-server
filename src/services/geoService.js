mapboxgl = require('mapbox-gl');
MapboxClient = require('mapbox');
turf = require('turf');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Jpc2hhYm9iciIsImEiOiJja3c2amkxNG0wcjNiMnZsanBpMnl3dWo1In0.Au_BOiTQ03LDRItEm3Gx6A';
var client = new MapboxClient(mapboxgl.accessToken);


function getGeoData(from, to) {

//data.features[0].center[0] + ', ' + data.features[0].center[1]


    var test = client.geocodeForward(from, function (err, data, res) {

        var test2 = client.geocodeForward(to, function (err2, data2, res2) {


            var dist = turf.distance(turf.point(data.features[0].center), turf.point(data2.features[0].center), "kilometers")
            console.log('Расстояние: ' + dist + ' км');
            console.log('Почтовый индекс 1: ' + data.features[0].context[0].text);
            console.log('Почтовый индекс 2: ' + data2.features[0].context[0].text);
        });
    })


    let geoData = {
        indexFrom: 999888,
        indexTo: 888999,
        distance: 898989
    };
    return geoData;
}




module.exports = { getGeoData}