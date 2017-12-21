
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('markers').del()
    .then(function () {
      return knex('fave_maps').del();

    })
    .then(function () {
      return knex("contribution").del();
    })
    .then(function () {
      return knex('maps').del();
    })
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('maps').insert({id: 1, user_id: 1, title: "new map", date_created: '20171220'}),
      ]);
    }).then(function () {
      return Promise.all([
        knex('markers').insert({id: 1, map_id: 1, longitude: 43.6, latitude: -79.3, title: "mymarker", description: 'stuff', image_url: 'asd'}),
        knex('markers').insert({id: 2, map_id: 1, longitude: -79.3, latitude: 43.6, title: "mymarker", description: 'stuff', image_url: 'asd'})
      ]);
    });
};


// exports.seed = function(knex, Promise) {
//   return knex('users').del()
//     .then(function () {
//       return Promise.all([
//         knex('users').insert({id: 1, name: 'Alice'}),
//         knex('users').insert({id: 2, name: 'Bob'}),
//         knex('users').insert({id: 3, name: 'Charlie'})
//       ]);
//     });
// };
