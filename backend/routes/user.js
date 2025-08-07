const { Router } = require("express");
const userRouter = Router();

const { createUser } = require('../models/userQueries');

userRouter.post('/', async (req, res) => {
    console.log(req.body)
    // !! Need to add password hashing here, we should actually send back a token?
    try {
      await createUser(req.body.username, req.body.first, req.body.last, req.body.password);
    } catch (err) {
      res.sendStatus(500);
    }
    res.send("NEW USER CREATED");
});


module.exports = {userRouter};