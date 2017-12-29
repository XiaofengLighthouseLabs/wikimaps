# WikiMaps

WikiMaps is a new app where you can add points to a map, save it to your favourites, and see a list of your favourites and maps that you've contributed to. Maps can have as many points as you like, and include descriptions and photos that you can later edit. Make a map of favourite neighbourhood places, create a vacation wishlist, you name it!

![Screenshot #1](https://github.com/ifellinaholeonce/wikimaps/blob/master/public/images/Screen%20Shot%202017-12-29%20at%2010.41.48%20AM.png?raw=true)
![Screenshot #2](https://github.com/ifellinaholeonce/wikimaps/blob/master/public/images/Screen%20Shot%202017-12-29%20at%2010.42.19%20AM.png?raw=true)
![Screenshot #3](https://github.com/ifellinaholeonce/wikimaps/blob/master/public/images/Screen%20Shot%202017-12-29%20at%2010.42.54%20AM.png?raw=true)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information, including a MAPS_KEY from Google.
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`


## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser 1.15.2 or above
- dotenv ^2.0.0
- ejs ^2.4.1
- express ^4.13.4
- knex ^0.11.7
- knex-logger ^0.1.0
- morgan ^1.7.0
- node-sass-middleware ^0.9.8
- pg ^6.0.2


Created by Tymm & Mary - 2017
