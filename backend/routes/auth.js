const { Router } = require("express");
const authRouter = Router();
const passport = require('passport');

authRouter.post('/login', 
  passport.authenticate("local", {
    failWithError: true,
    session:false
  }),
  function (req, res) {
    res.send('SUCCESSFULLY LOGGED IN');
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