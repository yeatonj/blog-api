const { Router } = require("express");
const blogRouter = Router();
const passport = require('passport');

blogRouter.get('/', (req, res) => {
    // !! TBI
  return res.send(`GETTING ALL BLOG POSTS, TBI`);
});

blogRouter.get('/:blogId', (req, res) => {
    // !! TBI
  return res.send(`GETTING POST ${req.params.blogId}, TBI`);
});

blogRouter.get('/:blogId/comment', (req, res) => {
    // !! TBI
  return res.send(`GETTING COMMENTS FOR POST ${req.params.blogId}, TBI`);
});

blogRouter.post('/:blogId/comment', (req, res) => {
    // !! TBI
  return res.send(`CREATING COMMENT FOR POST ${req.params.blogId}, TBI`);
});

blogRouter.put('/comment/:commentId', (req, res) => {
    // !! TBI
  return res.send(`EDITING COMMENT ${req.params.commentId}, TBI`);
});

blogRouter.post('/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    // !! TBI
    console.log(req.user);
  return res.send(`CREATING NEW POST, TBI`);
});

blogRouter.put('/:blogId', (req, res) => {
    // !! TBI
  return res.send(`EDITING POST ${req.params.blogId}, TBI`);
});

blogRouter.delete('/:blogId', (req, res) => {
    // !! TBI
  return res.send(`DELETING POST ${req.params.blogId}, TBI`);
});


module.exports = {blogRouter};