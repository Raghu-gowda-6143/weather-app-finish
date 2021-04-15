const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./src/utils/forecast');
const geocode = require('./src/utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

const publicFolder = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicFolder));

app.get('', (req, res) => {
    res.render('index', {
        title:"WEATHER APP",
        name:"HOME"
    });
});

app.get('/blog', (req, res) => {
    res.render('blog');
});
app.get('/about', (req, res) =>{
    res.render('about',{
        title:"WEATHER APP",
        name:"ABOUT",
        dev:"Raghu"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: "please provide address"});
    }


    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error});
        }


        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error});
            }
            res.send({
                temperature:forecastData.temperature,
                weather:forecastData.weather,
                rain: forecastData.rain,
                location,
                address: req.query.address
            });
        });
    });

    
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(port, () => {
    console.log('listening on '+ port);
});