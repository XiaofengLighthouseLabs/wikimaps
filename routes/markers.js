"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id/markers", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .where("map_id", Number(req.params.id))
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/:id/markers/new", (req, res) => {
    knex("markers")
      .insert({map_id: req.params.id, title: req.body.title, description: req.body.description, image_url: req.body.image_url, latitude: Number(req.body.lat), longitude: Number(req.body.lng)})
      .then (() => {
        if (knex.select("*").from("contribution").where({map_id: 1, user_id: 1}) ) {
          return;
        } else {
          return knex("contribution")
          .insert({user_id: 1, map_id: 1})
        }
      })
      .then (() => {
        res.status(200).send("new point added");
      });
  });

  router.post("/:id/markers/edit", (req, res) => {
    knex("markers")
      .where("id", Number([req.body.form_id]))
      .update({title: req.body.title, description: req.body.description, image_url: req.body.image_url})
      .then (() => {
        res.status(200).send("updated");
      });
  });

  router.post("/:id/markers/delete", (req, res) => {
    knex("markers")
      .where("id", Number([req.body.data]))
      .del()
      .then (() =>{
        res.status(200).send("deleted");
      });
  });

  router.get("/:id/markers/faves", (req, res) => {
    knex
      .select("*")
      .from("fave_maps")
      .innerJoin("maps", "map_id", "maps.id")
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/:id/markers/faves", (req, res) => {
    knex
      .select("*").from("fave_maps").where({map_id: req.params.id, user_id: 1})
        .then ((results) => {
          if (results.length === 0) {
            return knex("fave_maps")
            .insert({user_id: 1, map_id: req.params.id})
          } else {
            return;
          }
      })
      .then((results) => {
        res.status(200).send("favourited");
      });
  });

  router.get("/:id/markers/contributions", (req, res) => {
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
