"use strict";

const express = require('express');
const router  = express.Router();

const getYearMonthDay = () => {
  return new Date();
};

module.exports = (knex) => {

  //This route is for "discovering" maps
  router.get("/maps", (req, res) => {
    knex
    .select("*")
    .from("maps")
    .then((results) => {
      res.json(results);
    });
  });

  //This route is adding new maps
  router.post("/maps", (req, res) => {
    knex("maps")
    .insert({user_id: req.body.user_id, title: req.body.title, date_created: getYearMonthDay()})
    .returning('id')
    .then((results) => {
      res.json(results);
    });
  });

  //This is currently just to get the map totle
  router.get("/:id", (req, res) => {
    knex
    .select("*")
    .from("maps")
    .where("id", Number(req.params.id))
    .then((results) => {
      res.json(results);
    });
  });

  router.get("/:id/markers", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .where("map_id", Number(req.params.id))
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/:id/markers", (req, res) => {
    knex("markers")
      .insert({map_id: req.params.id, title: req.body.title, description: req.body.description, image_url: req.body.image_url, latitude: Number(req.body.lat), longitude: Number(req.body.lng)})
      .then (() => {
        knex
        .select("*")
        .from("contribution")
        .where({map_id: req.params.id, user_id: 1})
        .then((results) => {
          if (results.length == 0) {
            return knex("contribution")
            .insert({user_id: 1, map_id: req.params.id});
          } else {
            console.log("already contributed");
            return;
          }
        });
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
            .insert({user_id: 1, map_id: req.params.id});
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
