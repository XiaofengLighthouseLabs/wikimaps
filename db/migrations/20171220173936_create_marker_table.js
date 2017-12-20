
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('markers', (table) => {
      table.increments('id').primary();
      table.integer('map_id');
      table.foreign('map_id').references('maps.id');
      table.decimal('longitude');
      table.decimal('latitude');
      table.string('title');
      table.string('description');
      table.string('image_url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('markers')
  ]);
};
