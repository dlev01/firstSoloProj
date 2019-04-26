// const Cookies =  require('js-cookie');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');


const User = require('./user/userModel')
const apiController = require('./api/apiController');
const ticketController = require('./api/ticketController');
const weatherController = require('./api/weatherController')
const userController = require('./user/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./session/sessionController');

const app = express();


const mongoURI = process.env.NODE_ENV === 'development' ? 'mongodb://localhost/soloProjDev' : 'mongodb://localhost/soloProjProd';
mongoose.connect(mongoURI, { useNewUrlParser: true } );

// CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.engine('ejs', require('ejs').renderFile);
// app.set('view engine', 'ejs');


// Brings us to the index.ejs page upon reaching url
app.get('/', 
    cookieController.setCookie, 
    (req, res) => {
    app.set('view engine', 'ejs');
    res.render('../client/components/index.ejs');
  });


// Brings us to signup page
app.get('/signup', (req, res) => {
    app.set('view engine', 'ejs');
    res.render('../client/components/signup.ejs', {error: null});
});

app.post('/signup', 
    userController.createUser, 
    cookieController.setSSIDCookie, 
    cookieController.setCookie,
    sessionController.startSession, 
    // sessionController.isLoggedIn, 
    (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
});

app.post('/login',
    userController.verifyUser,
    cookieController.setSSIDCookie,
    cookieController.setCookie,
    sessionController.startSession,
    sessionController.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  });

// Removed so the only way to gain access to Home is by verifying or creating user
// app.get('/home', (req, res) => {
//     // res.render('../client/components/home.js', { users: users });
//     res.sendFile(path.join(__dirname, '../index.html'))
// });

app.get('/getAll', 
    apiController.getYelp,
    ticketController.getEvents,
    weatherController.getWeather,
    (req, res) => {
    res.json(res.locals)
})

if (process.env.NODE_ENV === 'production') {
    // statically serve everything in the build folder on the route '/build'
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../index.html'));
    });
};

app.listen(3000, () => console.log('listening on 3000'));