var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var env = require('dotenv').config()
var app = express()
var cors = require('cors')

// cors
app.use(cors()); // include before other routes
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('you did it!');
});
router.get('/posts', function(req, res, next) {
  const results = {};
  knex('posts')
  .then(function(posts){
    results.posts = posts;
  })
  .then(function () {
    knex('comments')
    .then(function(comments) {
      results.comments = comments;
      for (var i = 0; i < results.posts.length; i++) {
        results.posts[i].comments = [];
        results.posts[i].showComments = false;
        for (var j = 0; j < results.comments.length; j++) {
          if (results.posts[i].id === results.comments[j].post_id) {
            results.posts[i].comments.push(results.comments[j])
          }
        }
      }
      delete results.comments;
      res.json(results);
    })
  })
});
// router.get('/posts',function (req,res,next) {
//   const results = {}
//   knex('posts')
//   .then(function(posts) {
//     results.posts = posts
//   })
//   .then(function () {
//   knex('comments')
//     .then(function (comments) {
//       results.comments = comments
//         results.posts.forEach(function(post) {
//            post.comments = [];
//            console.log('post: ',post)
//         })
//         results.comments.forEach(function(comment) {
//           if(.id === comment.post_id) {
//             results.posts.comments.push(comment)
//           }
//         })
//       })
//       delete results.comments;
//       res.json(results)
//
//   })
// })

module.exports = router;
