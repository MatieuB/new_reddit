exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert(
      [
        {
          comment:'i like banjos',
          user_id: 1,
          post_id:1
        },
        {
          comment:'i like cheese',
          user_id: 1,
          post_id:1
        },
        {
          comment:'i like comments',
          user_id: 2,
          post_id:1
        },
        {
          comment:'comments are great',
          user_id: 3,
          post_id:1
        },
        {
          comment:'fun times?',
          user_id: 1,
          post_id:2
        },
        {
          comment:'wanna go to the beach',
          user_id: 3,
          post_id:2
        },
        {
          comment:'I need a vacation',
          user_id: 2,
          post_id:2
        }
      ])

    );
  };
