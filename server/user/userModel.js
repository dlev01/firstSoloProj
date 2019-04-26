const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true}
});

// use bcrypt to pre hash pw before saving
userSchema.pre('save', function(next) {
  if (this.password) {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  };
  next();
});

userSchema.methods.verifyPassword = function (password, next) {
  bcrypt.compare(password, this.password, function(error, matched) {
    if (error) {
      console.log(error);
    }
    // matched evaluates to true
    next(matched);
  });
};

module.exports = mongoose.model('User', userSchema);
