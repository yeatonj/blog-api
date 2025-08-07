const { Router } = require("express");
const userRouter = Router();

const { createUser } = require('../models/userQueries');
const { genPassword } = require('../lib/passwordUtils');

userRouter.post('/', async (req, res) => {
    let hashPassword = await genPassword(req.body.password);
    let success;
    try {
      success = await createUser(req.body.username, req.body.first, req.body.last, hashPassword);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
    if (success) {
      res.send("NEW USER CREATED");
    } else {
      res.sendStatus(500);
    }
    
});


module.exports = {userRouter};