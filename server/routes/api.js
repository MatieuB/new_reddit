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
router.get('/posts',function (req,res,next) {
  knex('posts')
    .then(function(data) {
      console.log(data)
      res.json(data)
    })
  })

module.exports = router;
