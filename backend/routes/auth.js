const { Router } = require("express");
const authRouter = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

authRouter.post('/login', 
  passport.authenticate("local", {
    failWithError: true,
    session:false
  }),
  function (req, res) {
    // Create user
    const user = {
      id: req.user.id,
      username: req.user.username,
      admin: req.user.admin
    }
    // Create token and return to the user
    jwt.sign({user: user}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
        res.json({
            token: token,
        });
    });
  },
  // Unauthorized error handler
  function(err, req, res, next) {
    res.sendStatus(401);
  }
);

authRouter.post('/validate', (req, res) => {
    // !! TBI
  res.send(`ATTEMPTING TO VALIDATE, TBI`);
});



module.exports = {authRouter};