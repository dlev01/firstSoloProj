const User = require('../user/userModel');
const axios = require('axios');

const ticketController = {};

ticketController.getEvents = (req, res, next) => {
    User.findOne({username: req.cookies.user}, (err, result) => {
        // console.log(result)
        res.locals.user = result.username;
        res.locals.city = result.city;
        res.locals.state = result.state;


        axios.get('https://app.ticketmaster.com/discovery/v2/events?apikey=sDshqEyyjGr0MluztLO7saEDmrP2i1X2&countryCode=US&size=15', {
            params: {
                city: res.locals.city,
                stateCode: res.locals.state,
                sort: 'date,asc'
            }
            })
        .then(function (data) {
            // parse recieved API data
            let ticketArr = [];
            let events;
            if (data.data['_embedded'] != undefined && data.data['_embedded'].events != undefined) {
                // console.log(data.data['_embedded'].events)
                events = data.data['_embedded'].events;
            } else {
                return next()
            }
            // console.log(events)
            events.forEach(el => {
                // console.log(el.name)
                // if (el['_embedded']['venues'][0].city.name === res.locals.city && el['_embedded']['venues'][0].state.stateCode === res.locals.state){
                    let obj = {};
                    // console.log('found one')
                    obj['event'] = el.name;
                    obj['venue'] = el['_embedded']['venues'][0].name;
                    obj['image'] = el.images[0].url;
                    ticketArr.push(obj);
                // }
            })
            res.locals.ticket = ticketArr;
            next();
        })
        .catch(function (error) {
            console.log('event fetch failed')
            console.log(error);
        });

    })
}

module.exports = ticketController;