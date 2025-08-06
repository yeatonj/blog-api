const { Router } = require("express");
const userRouter = Router();

userRouter.post('/', (req, res) => {
    // !! TBI
  return res.send("CREATING NEW USER, TBI");
});


module.exports = {userRouter};