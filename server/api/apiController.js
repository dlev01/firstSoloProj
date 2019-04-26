const User = require('../user/userModel');
const axios = require('axios');

const apiController = {};

apiController.getYelp = (req, res, next) => {
    User.findOne({username: req.cookies.user}, (err, result) => {
        // console.log(result)
        res.locals.user = result.username;
        res.locals.city = result.city;
        res.locals.state = result.state;

        // make request to outside API using city/state

        // Client ID
        // 6MECXIyNWR1gt-Sk8oS7gQ
        // API Key
        // AiFRV44VgBmjJQjhgPyg9JYekzJwGM9eFm7_GWUkT6JCSihO2DVC6NiJ7X2tP8VP1j34lKOTgMIEHE6cUcLi9YpDDqUR8w3wADfn7sg_qbyjiFXn4n7Gw0xAYSXBXHYx
        axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                'Authorization': 'Bearer AiFRV44VgBmjJQjhgPyg9JYekzJwGM9eFm7_GWUkT6JCSihO2DVC6NiJ7X2tP8VP1j34lKOTgMIEHE6cUcLi9YpDDqUR8w3wADfn7sg_qbyjiFXn4n7Gw0xAYSXBXHYx'
            },
            params: {
                categories: 'best restaurant',
                sort_by: 'best_match',
                location: `${res.locals.city},${res.locals.state}`,
                limit: 15
            }
        })
        .then(function (data) {
            // parse recieved API data
            let foodArr = [];
            let food = data.data.businesses;
            // console.log(food)
            food.forEach(el => {
                let obj = {};
                // console.log(el)
                obj['name'] = el.name;
                obj['image_url'] = el.image_url;
                obj['review_count'] = el.review_count;
                obj['rating'] = el.rating;
                foodArr.push(obj);
            })
            res.locals.yelp = foodArr;
            // console.log(foodArr)
            // res.json(res.locals);
            next();
        })
        .catch(function (error) {
            console.log('yelp fetch failed')
            console.log(error);
        });

    })
}

module.exports = apiController;