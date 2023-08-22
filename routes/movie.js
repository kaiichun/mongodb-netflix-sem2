const express = require("express");
const router = express.Router();

// import model into router
const movie = require("../models/movie");

// list all the movies
router.get("/", async (request, response) => {
  /* better filtering method */
  const { genre, rating, release_year } = request.query;
  let filter = {};
  if (genre || rating || release_year) {
    if (genre) {
      filter.genre = genre; // { genre: genre }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { rating: { $gt: rating } }
    }

    if (release_year) {
      filter.release_year = { $gt: release_year }; // { release_year: { $gt: release_year } }
    }
    response.send(await movie.find(filter));

    /* old method */
    // let list = false;
    // if (request.query.genre) {
    //   list = await movie.find({ genre: request.query.genre });
    // } else if (request.query.rating) {
    //   list = await movie.find({ rating: { $gt: request.query.rating } });
    // } else if (request.query.release_year) {
    //   list = await movie.find({
    //     release_year: { $gt: request.query.release_year },
    //   });
    // } else {
    //   list = await movie.find();
    // }
    // response.send(list);
  }
});

// get specific movies by id
router.get("/:id", async (request, response) => {
  const findmovie = await movie.findOne({ _id: request.params.id });
  response.send(findmovie);
});

module.exports = router;
