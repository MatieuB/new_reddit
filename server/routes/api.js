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
  const _posts = []
  knex('posts')
  .innerJoin('users','posts.user_id','users.id')
  .select('posts.title','posts.description','posts.votes','posts.image_url','posts.created_at','users.name','posts.id','posts.user_id')
  .then(function(data){
    console.log('data: ', data);
    data.forEach(function(item){
      _posts.push({
        id:item.id,
        user_id:item.user_id,
        title:item.title,
        description:item.description,
        image_url:item.image_url,
        votes: item.votes,
        username: item.name,
        created_at: item.created_at,
        comments: []
      })
    })
    return knex('comments')
    .innerJoin('users','comments.user_id','users.id')
    .select('users.name','comments.comment','comments.post_id','comments.id','comments.user_id')
  })
  .then(function(dataComments){
    _posts.forEach(function(post){
      dataComments.forEach(function(comment){
        console.log('comment: ',comment);
        if(post.id === comment.post_id){
          post.comments.push(comment)
        }
      })
    })
    console.log('posts: ',_posts);
    res.json(_posts)
  })
})

module.exports = router;
