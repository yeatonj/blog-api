const { Router } = require("express");
const blogRouter = Router();

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

blogRouter.post('/', (req, res) => {
    // !! TBI
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