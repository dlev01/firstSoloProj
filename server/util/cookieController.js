
const sessionController = require('../session/sessionController');

const cookieController = {};
cookieController.setCookie = setCookie;
cookieController.setSSIDCookie = setSSIDCookie;

/**
* setCookie - set a cookie with a random number
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setCookie(req, res, next) {

  res.cookie('user', res.locals.user);
  // res.cookie('home', Math.floor(Math.random() * 99));
  next();
}

/**
* setSSIDCookie - store the supplied id in a cookie
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
* @param next - Callback with signature ([err])
*/
function setSSIDCookie(req, res, next) {

  res.cookie('ssid', res.locals.ssid, { httpOnly: true });
  // console.log('created SSID cookie')
  next();
}

module.exports = cookieController;
