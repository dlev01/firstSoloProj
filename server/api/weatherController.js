const User = require('../user/userModel');
const axios = require('axios');

const weatherController = {};

weatherController.getWeather = (req, res, next) => {
    User.findOne({username: req.cookies.user}, (err, result) => {
        // console.log(result)
        res.locals.user = result.username;
        res.locals.city = result.city;
        // console.log(res.locals.city)
        res.locals.state = result.state;

// {
    // "dt": 1556218800,
    // "main": {
    //     "temp": 74.08,
    //     "temp_min": 74.08,
    //     "temp_max": 74.79,
    //     "pressure": 1015.24,
    //     "sea_level": 1015.24,
    //     "grnd_level": 1008.83,
    //     "humidity": 39,
    //     "temp_kf": -0.4
    // },
    // "weather": [
    //     {
    //         "id": 800,
    //         "main": "Clear",
    //         "description": "clear sky",
    //         "icon": "01d"
    //     }


        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${res.locals.city},us&APPID=f65fc53f20bbf6eae158dccfd4a5c2b7&units=imperial`)
        .then(function (data) {
            // console.log(data)
            // parse recieved API data
            let weatherArr = [];
            let weather = data.data;
            // console.log(weather)
            // weather.forEach(el => {
                let obj = {};
                // console.log('found one')
                obj['high'] = weather.main.temp_max.toFixed(0);
                obj['low'] = weather.main.temp_min.toFixed(0);
                obj['desc'] = weather.weather[0].description;
                weatherArr.push(obj);
            // })
            res.locals.weather = weatherArr;
            next();
        })
        .catch(function (error) {
            console.log('weather fetch failed')
            console.log(error);
        });

    })
}

module.exports = weatherController;