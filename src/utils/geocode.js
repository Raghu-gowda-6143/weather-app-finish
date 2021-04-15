const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFnaHUtZ293ZGEiLCJhIjoiY2ttc25yc2s3MDR2djJucGM1ZDJwbWlxYSJ9.SuOdYgSyyIUbBgTr2JQerQ';

    request({url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect. Check your connection', undefined);
        } 
        else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined);
        } 
        else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name});
        }
    });
};

module.exports = geocode;