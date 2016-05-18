
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('comments', function(table){
    table.increments('id');
    table.text('comment');
    table.integer('user_id').unsigned().references('users.id').onDelete('cascade').onUpdate('cascade');
    table.integer('post_id').unsigned().references('posts.id').onDelete('cascade').onUpdate('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schem.dropTable('comments')
};
