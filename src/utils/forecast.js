const request = require("request");

const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=227bcd74b8327ba2f0c4589eb3c6448d&query='+latitude+','+longitude;

    request({url:url, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect weather service',undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        }else{
            callback(undefined, forecastData = {
                    temperature : response.body.current.temperature + ' ' + 'degree celsius',
                    weather: response.body.current.weather_descriptions,
                    rain: "chance of rain "+ response.body.current.precip +"%"
                }
                
            );
        }
    });

};


module.exports = forecast;