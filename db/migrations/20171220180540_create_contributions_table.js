
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('contribution', (table) => {
      table.integer('user_id').notNullable();
      table.foreign('user_id').references('users.id');
      table.integer('map_id').notNullable();
      table.foreign('map_id').references('maps.id');
      table.unique(['user_id', 'map_id']);
    })
  ]);
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contribution')
  ]);
};
