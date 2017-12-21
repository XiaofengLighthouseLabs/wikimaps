exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contribution').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contribution').insert({ user_id: '1', map_id: '1'})
      ]);
    });
};
