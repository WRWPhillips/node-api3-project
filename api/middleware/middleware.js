//model import
const Users = require('../users/users-model.js');
const Posts = require('../posts/posts-model.js');

function errorHandling(err, req, res, next) {
  res.status(err.status).json({
    message: err.message,
    stack: err.stack
  });
}

function logger(req, res, next) {
  console.log(`${req.method}, ${req.url}, ${Date.now()}`);
  next();
}

function validateUserId(req, res, next) {
    Users.getById(req.params.id)
    .then(user => {
      if(!user) { 
        next({status: 404, message:"user not found"});
      } else {
        req.user = user
        next();
      }
    })
    .catch(err => {
    next(err);   
    });
}

function validateUser(req, res, next) {
  req.body.name ? next() : next({status: 400, message: "missing required name field" });
}

function validatePost(req, res, next) {
  const { text } = req.body;
  text ? next() : next({status: 400, message: "missing required text field"});
}

module.exports = {logger, validateUserId, validateUser, validatePost, errorHandling};
