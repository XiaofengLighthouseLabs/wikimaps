
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('fave_maps').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('fave_maps').insert({ user_id: '1', map_id: '1'})
      ]);
    });
};
