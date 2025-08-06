const { Router } = require("express");
const authRouter = Router();

authRouter.post('/login', (req, res) => {
    // !! TBI
  return res.send(`ATTEMPTING TO LOGIN, TBI`);
});

authRouter.post('/validate', (req, res) => {
    // !! TBI
  return res.send(`ATTEMPTING TO VALIDATE, TBI`);
});

authRouter.post('/logout', (req, res) => {
    // !! TBI
  return res.send(`ATTEMPTING TO LOGOUT, TBI`);
});



module.exports = {authRouter};