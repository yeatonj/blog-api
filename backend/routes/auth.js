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
    }
    // Create token and return to the user
    jwt.sign({user: user}, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
        res.json({
            token: token,
            admin: req.user.admin,
        });
    });
  },
  // Unauthorized error handler
  function(err, req, res, next) {
    res.sendStatus(401);
  }
);



module.exports = {authRouter};