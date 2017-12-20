
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('contribution', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.integer('map_id');
      table.foreign('map_id').references('maps.id');
    })
  ]);
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contribution')
  ]);
};
