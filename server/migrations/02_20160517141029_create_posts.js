exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table){
    table.increments('id');
    table.integer('user_id').unsigned().references('users.id').onDelete('cascade').onUpdate('cascade');
    table.string('title');
    table.text('description');
    table.string('image_url');
    table.integer('votes');
    table.boolean('favorite');
    table.boolean('showComments');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
