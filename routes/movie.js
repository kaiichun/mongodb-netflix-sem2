const express = require("express");
const router = express.Router();

// import model into router
const movie = require("../models/movie");

/* list all the movies */
router.get("/", async (request, response) => {
  const { genre, rating, release_year } = request.query;
  let filter = {};
  /* better filtering method */
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
  }
  response.send(await movie.find(filter));

  /* old method */
  // if (genre) {
  //   list = await movie.find({ genre: genre });
  // } else if (rating) {
  //   list = await movie.find({ rating: { $gt: rating } });
  // } else if (release_year) {
  //   list = await movie.find({ release_year: { $gt: release_year } });
  // } else {
  //   list = await movie.find();
  // }
});

/* get specific movie by id */
router.get("/:id", async (request, response) => {
  const data = await movie.findOne({ _id: request.params.id });
  response.send(data);
});

module.exports = router;
