
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('maps').del()
    .then(function () {
      knex('markers').del();
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('maps').insert({id: 1, user_id: 1, title: "new map", date_created: '20171220'}),
      ]);
    }).then(function () {
      return Promise.all([
        knex('markers').insert({id: 1, map_id: 1, longitude: 43.6, latitude: -79.3, title: "mymarker", description: 'stuff', image_url: 'asd'})
      ]);
    });
};
