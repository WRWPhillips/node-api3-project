const express = require('express');

const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
const {
  validateUser,
  validateUserId,
  validatePost
} = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json(users);
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a to verify user id
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  });
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  });
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user);
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
    .then(user => {
      Users.remove(req.params.id)
        .then(() => {
          res.status(200).json(user);
        });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    });
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const newPost = await Posts.insert({
      user_id: req,params, id,
      text: req.tex
    });      
    res.status(201).json(newPost);
  }
  catch(err) {
    next(err);
  }
});
module.exports = router;
