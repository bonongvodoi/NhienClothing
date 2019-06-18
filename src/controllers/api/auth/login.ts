import { Users } from "../../../models/schemas/userSchema";

const authenticationRouter = require('express').Router();
const uuidv4  = require('uuid/v4');

module.exports = authenticationRouter;

authenticationRouter.post('/', function(req, res, next) {
  global['currentUser'] = null;
  if (req.body.magicToken) {
    Users.findOne({ magicToken: req.body.magicToken })
      .then(user => {
        if (!user)
          throw {
            status: 200,
            message: 'Invalid link',
            details: 'User not found via magicToken',
          };
        return res.json({ success: true, data: user.getCurrentUser() });
      })
      .catch(next);
  } else {
    req
      .checkBody('email')
      .notEmpty()
      .isEmail();
    let errors = req.validationErrors();
    if (errors) {
      if (errors[0].param == 'email')
        return next({ status: 200, message: 'Sai địa chỉ email' });
      return next(errors);
    }

    let email = req.body.email.toLowerCase();
    let user;
    Users.findOne({ email })
      .then(_user => {
        if (!_user)
          throw {
            status: 200,
            message: 'Sai địa chỉ email hoặc mật khẩu. Hãy thử lại',
            details: 'User not found',
          };
        user = _user;
        return user.comparePassword(req.body.password);
      })
      .then(isMatch => {
        if (!isMatch)
          throw {
            status: 200,
            message: 'Invalid email or password. Try again',
            details: 'Password is not matching',
          };
        global['currentUser'] = user.getCurrentUser();
        res.cookie('access_token',JSON.stringify(user.getCurrentUser()), { maxAge: 604800, httpOnly: true });
        return res.json({ success: true, data: user.getCurrentUser() });
      })
      .catch(next);
  }
});

authenticationRouter.post('/logout', function(req, res, next) {
  
})