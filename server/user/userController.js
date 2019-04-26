const User = require('./userModel');
const cookieController = require('./../util/cookieController');
const sessionController = require('./../session/sessionController');

const userController = {};


userController.getAllUsers = (next) => {
  User.find({}, next);
};


userController.createUser = (req, res, next) => {

  if (req.body.password && req.body.username) {
  
    User.create(req.body, function(error, doc) {

      if (error) {
        res.redirect(404, '/signup');
        // res.render('../../client/components/signup.ejs', {error: error.errmsg})
      } else {
        // console.log('created user')
        res.locals.ssid = doc['_id'];
        res.locals.user = doc.username;
        res.locals.city = doc.city;
        res.locals.state = doc.state;
        // console.log(res.locals.user)
        // console.log(res.locals.city)
        // console.log(res.locals.state)
        next();
      }
    });
  } else {
    // if either field was not entered correctly, redirect to signup
    res.redirect(404, '/signup');
    // res.render('../../client/components/signup.ejs', {error: 'error: bad request'});
  }

};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
userController.verifyUser = (req, res, next) => {
  // use body parser to convert info in post body into JSON object
  // check if user exists in database
  // whenever you query the database (eg User.find), results are returned in an array
  User.findOne({username: req.body.username}, function (error, docs) {
    
    if (error) {
      console.log(error)
      res.send(error)
    }
    
    if (docs) {
      
      new Promise (function(resolve, reject) {
        
        docs.verifyPassword(req.body.password, function(result) {
          resolve(result);
        });

      }).then(function(promiseResult) {

        if (promiseResult === true) {
          res.locals.ssid = docs['_id'];
          res.locals.user = docs.username;
          res.locals.city = docs.city;
          res.locals.state = docs.state;
          // console.log('verified user')
          next();

        } else {
          // if password no match, redirect to signup
          res.setHeader('Location', '/signup');
          res.redirect(404, '/signup');
          // res.render('../../client/components/signup.ejs', {error: 'Password was incorrect.'});
        }
      })
    } else {
      // if no user found, redirect to signup
      res.setHeader('Location', '/signup');
      res.redirect(404, '/signup');
      // res.render('../../client/components/signup.ejs', {error: 'Username not found.'});
    }
  })
};

module.exports = userController;
