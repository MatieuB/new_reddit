var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);
var env = require('dotenv').config()
var app = express()
var cors = require('cors')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

// cors
app.use(cors()); // include before other routes
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('you did it!');
});
// me route
router.get('/users/me', function (req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    // IF it was expired - verify would actually throw an exception
    // we'd have to catch in a try/catch
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // payload is {id: 56}
    knex('users').where({id: payload.id}).first().then(function (user) {
      if (user) {
        res.json({id: user.id, username: user.username})
      } else {
        res.status(403).json({
          error: "Invalid ID"
        })
      }
    })
  } else {
    res.status(403).json({
      error: "No token"
    })
  }
})
router.post('/users/add',function(req,res,next) {
  const errors = []

  if (!req.body.email || !req.body.email.trim()) errors.push("Email can't be blank");
  if (!req.body.name || !req.body.name.trim()) errors.push("Name can't be blank");
  if (!req.body.password || !req.body.password.trim()) errors.push("Password can't be blank");

  if (errors.length) {
    res.status(422).json({
      errors: errors
    })
  } else {
    knex('users')
      .whereRaw('lower(email) = ?', req.body.email.toLowerCase())
      .count() // [{count: "0"}]
      .first() // {count: "0"}
      .then(function (result) {
         // {count: "0"}
         if (result.count === "0") {
           const saltRounds = 4;
           const hash = bcrypt.hashSync(req.body.password, saltRounds);
           knex('users')
            .insert({
              email: req.body.email,
              name: req.body.name,
              password: hash
            })
            .returning('*')
            .then(function (users) {
              console.log('from the promise:',users);
              const user = users[0];
              const token = jwt.sign( {id:user.id} , process.env.JWT_SECRET);
              // console.log('token',token)
              res.json({
              id: user.id,
              email: user.email,
              username: user.username,
              token: token
            })
          })

          } else {
          res.status(422).json({
            errors: ["Email has already been taken"]
          })
        }
      })
  }
})
router.post('/posts/add',function(req,res,next) {
  console.log('req.body: ',req.body);

  knex('posts')
  .insert(req.body)
  .returning('*')
  .then(function(data){
    console.log(data);
  res.json(data);
  })
})
// login
router.post('/login', function(req,res,next) {
  knex('users')
    .where('email', '=', req.body.email.toLowerCase())
    .first()
    .then(function(response){
      // error check for email??
      if(response && bcrypt.compareSync(req.body.password, response.password)){
       console.log('user found');
      //  console.log('from the response promise:', response)
       const user = response;
       console.log('user: ',user)
       const token = jwt.sign( {id:user.id} , process.env.JWT_SECRET);
       console.log('token',token)
          res.json({
          id: user.id,
          email: user.email,
          username: user.name,
          token: token
          })
        } else {
        res.status(422).send('Invalid email or password')

      }
    });
})

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
