"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id/faves", (req, res) => {
    knex
      .select("*")
      .from("fave_maps")
      .innerJoin("maps", "map_id", "maps.id")
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/:id/faves", (req, res) => {
    const { currentMap } = req.body;
    knex
      .select("*")
      .from("fave_maps")
      .where({map_id: currentMap, user_id: req.params.id})
      .then ((results) => {
          // If the map is not in the results, add a row to the fave_maps table
          if (results.length === 0) {
            return knex("fave_maps")
              .insert({user_id: 1, map_id: currentMap});
          } else {
          // If the query results in a map, do not add anything to the table.
            return;
          }
      })
      .then((results) => {
        res.status(200).send("favourited");
      });
  });

  router.get("/:id/contributions", (req, res) => {
    knex
      .select("*")
      .from("contribution")
      .innerJoin("maps", "map_id", "maps.id")
      .then((results) => {
        res.json(results);
      });
  });

  return router;
};
