const { Router } = require("express");
const blogRouter = Router();
const passport = require('passport');
const { getAllPosts,
  getAllPublishedPosts,
  createPost,
  deletePost,
  editPost,
  getPost,
  createComment,
  getCommentOwner,
  editComment 
} = require('../models/blogQueries');

blogRouter.get('/', async (req, res) => {
    let posts;
    try {
      posts = await getAllPublishedPosts();
      return res.json(posts);
    } catch (err) {
      console.log(err);
      return res.status(501).end('Server Error');
    }  
});

blogRouter.get('/all', (req, res) => {
  // !! TBI
  return res.send(`GETTING ALL BLOG POSTS INCLUDING UNPUBLISHED, TBI`);
})

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
  async (req, res) => {
    if (!req.user.admin) {
      return res.status(403).end('Forbidden');
    }
    // We know we have the ability to post, so go for it
    try {
      await createPost(req.user.id, req.body.title, req.body.content);
    } catch (err) {
      return res.status(501).end('Server Error');
    }
  return res.send(`Post successfully created.`);
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