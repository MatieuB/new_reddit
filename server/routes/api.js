var express = require('express');
var router = express.Router();
var knex = require('knex')
var env = require('dotenv').config()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('you did it!');
});

module.exports = router;
