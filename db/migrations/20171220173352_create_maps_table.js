
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('maps', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.string('title');
      table.date('date_created');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('maps')
  ]);
};
