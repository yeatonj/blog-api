const { authRouter } = require('./auth');
const { userRouter } = require('./user');
const { blogRouter } = require('./blog');

module.exports = {
    authRouter,
    userRouter,
    blogRouter
};