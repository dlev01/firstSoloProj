const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = (req, res, next) => {

  // cookie JSON object is available in req.cookie
  // connect to Session database and find value of 'ssid'
  // console.log('ssid in isLoggedIn ', res.locals.ssid)
  Session.find({cookieId: res.locals.ssid}, function (error, docs) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      // if session found a match for cookieid, then the cb
      // needs to confirm that the return value was saved in mongo 'docs'
      // console.log(docs)
      if (docs.length > 0) {
        // move on to next middleware that will redir to secret
        // ** instead of calling next can use res.redirect to /secret **
        // console.log('started isLogged in')
        next();
      } else {
        // else redir to signup and send error
        res.setHeader('Location', '/signup');
        res.redirect(404, '/signup');
        // res.render('../../client/components/signup.ejs', {error: 'SSID invalid.'})
      };
    };
  });
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res, next) => {
  // docs in mongoose aka response
  // console.log(res.locals.ssid)
  Session.findOneAndUpdate({cookieId: res.locals.ssid}, {cookieId: res.locals.ssid}, {new: true, upsert: true},function (error, docs) {
    if (error) {
      console.log('This is an error.' + error);
      res.send(error)
    };
  });
  // console.log('started session')
  next()
};

module.exports = sessionController;
