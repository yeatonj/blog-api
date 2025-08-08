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

blogRouter.get('/all',  
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    if (!req.user.admin) {
      return res.status(403).end('Forbidden');
    }
    // We know we have the ability to post, so go for it
    let posts;
    try {
      posts = await getAllPosts();
    } catch (err) {
      return res.status(501).end('Server Error');
    }
    return res.json(posts);
})

blogRouter.get('/:blogId', 
  async (req, res) => {
    let post;
    try {
      post = await getPost(parseInt(req.params.blogId));
      // Check if published. If not, post not found.
      if (!post.published) {
        return res.status(501).end('Post not found');
      }
      return res.json(post);
    } catch (err) {
      return res.status(501).end('Post not found');
    }
  }
);

blogRouter.get('/protected/:blogId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // Deny non-admins
    if (!req.user.admin) {
      return res.status(403).end('Forbidden');
    }
    let post;
    try {
      post = await getPost(parseInt(req.params.blogId));
      return res.json(post);
    } catch (err) {
      return res.status(501).end('Post not found');
    }
  }
);

blogRouter.post('/:blogId/comment', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    // We know we have the ability to post, so go for it
    try {
      await createComment(req.params.blogId, req.user.id, req.body.content);
    } catch (err) {
      return res.status(501).end('Server Error');
    }
    return res.send(`Comment successfully created`);
});

blogRouter.put('/comment/:commentId', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    // Find the post owner
    let ownerId = getCommentOwner(req.body.id);
    if (!ownerId) {
      return res.status(501).end('Comment not found');
    }
    if (!(req.user.admin || req.user.id === ownerId)) {
      return res.status(403).end('Forbidden');
    }
    // We know we have the ability to post, so go for it
    try {
      await editComment(req.body.id, req.body.content, req.body.published);
    } catch (err) {
      return res.status(501).end('Server Error');
    }
    return res.send(`Comment successfully edited.`);
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

blogRouter.put('/:blogId', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    if (!req.user.admin) {
      return res.status(403).end('Forbidden');
    }
    // We know we have the ability to post, so edit it
    try {
      await editPost(req.params.blogId, req.user.id, req.body.title, req.body.content);
    } catch (err) {
      return res.status(501).end('Server Error');
    }
    return res.send(`Post successfully edited.`);
});

blogRouter.delete('/:blogId', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    if (!req.user.admin) {
      return res.status(403).end('Forbidden');
    }
    // We know we have the ability to delete, so do it
    try {
      await deletePost(req.params.blogId);
    } catch (err) {
      return res.status(501).end('Server Error');
    }
    return res.send(`Post successfully deleted.`);
});


module.exports = {blogRouter};