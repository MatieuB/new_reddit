
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert([
        {
          title:'test post',
          user_id:1,
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image_url:"http://static.wixstatic.com/media/9759b2_6c06b978af9044fc8c8642acaabe8d4e.jpg_srz_978_643_85_22_0.50_1.20_0.00_jpg_srz",
          votes: 0,
          showComments: false,
          favorite:false
        },
        {
          title:'test 2 post',
          user_id:2,
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image_url:"http://resources1.news.com.au/images/2007/08/16/va1237262195811/KermitMississippi-Development-Authority-5613248.jpg",
          votes: 4,
          showComments: false,
          favorite:false

        },
        {
          title:'post master man',
          user_id:3,
          description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', image_url:'http://media.cleveland.com/parents/photo/9853524-large.jpg',
          votes: 5,
          showComments: false,
          favorite:false
        }
      ])

    )
  }
