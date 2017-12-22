
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
        knex('maps').insert({user_id: 1, title: 'new map', date_created: '20171220'}),
        knex('maps').insert({user_id: 2, title: 'weird Arizona things', date_created: '20171221'}),
        knex('maps').insert({user_id: 3, title: 'logos from the sky', date_created: '20171221'})
      ]);
    }).then(function () {
      return Promise.all([
        knex('markers').insert({map_id: 1, longitude: 43.6, latitude: -79.3, title: 'mymarker', description: 'stuff', image_url: 'http://channel.nationalgeographic.com/exposure/content/photo/photo/45067_king-penguin_2celqsmn7wjoruiarckfuqxvt62ptt7hevj74cagwi5qbj2htjuq_757x567.jpg'}),
        knex('markers').insert({map_id: 1, longitude: -79.3, latitude: 43.6, title: 'mymarker', description: 'stuff', image_url: 'http://www.seetorontonow.com/wp-content/uploads/2017/11/toronto-skyline-winter.jpg'}),
        knex('markers').insert({map_id: 2, longitude: -110.5, latitude: 32.1, title: 'airplane boneyard', description: 'the southwest', image_url: 'http://twistedsifter.files.wordpress.com/2014/02/airplane-boneyard-tucson-arizona-google-earth.jpg?w=800&h=444'}),
        knex('markers').insert({map_id: 2, longitude: -112.6, latitude: 33.7, title: 'giant triangle', description: 'big ol\' triangle', image_url: 'http://twistedsifter.files.wordpress.com/2014/02/giant-triangle-google-earth.jpg?w=800&h=444'}),
        knex('markers').insert({map_id: 3, longitude: -123.6, latitude: 45.7, title: 'Firefox logo', description: 'Dayton, OR', image_url: 'http://twistedsifter.files.wordpress.com/2014/02/firefox-logo-google-earth.jpg?w=800&h=443'}),
        knex('markers').insert({map_id: 3, longitude: -0.5, latitude: 51.8, title: 'Lion King', description: 'United Kingdom', image_url: 'http://twistedsifter.files.wordpress.com/2014/02/lion-google-earth.jpg?w=800&h=443'})
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
