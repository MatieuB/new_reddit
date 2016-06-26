
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert([
    {
      name:'matthew',
      email:'bouchard.matthewj@gmail.com',
      password:'password'
    },
    {
      name:'liza',
      email:'lizashademiller@gmail.com',
      password:'password'
    },
    {
      name:'mateos',
      email:'bouchard221@gmail.com',
      password:'password'
    }
  ])

)
};
