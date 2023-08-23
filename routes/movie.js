const express = require("express");
const router = express.Router();

// import model into router
const Movie = require("../models/movie");

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
  response.send(await Movie.find(filter));

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
  const data = await Movie.findOne({ _id: request.params.id });
  response.send(data);
});

/* create new movie route */
router.post("/", async (request, response) => {
  // request.params;
  // request.query;
  // request.body;
  // request.send("ok");

  // create a placeholder for a new movie
  const newMovie = new Movie({
    title: request.body.title,
    director: request.body.director,
    release_year: request.body.release_year,
    genre: request.body.genre,
    rating: request.body.rating,
  });
  // save the movie into mongodb
  await newMovie.save();
  response.send(newMovie);
});

/* update a movie */
router.put("/:id", async (request, response) => {
  // get movie id
  const movie_id = request.params.id;
  // update the movie
  const updatedMovie = await Movie.findByIdAndUpdate(movie_id, request.body, {
    new: true,
  });
  response.send(updatedMovie);
});

/* delete a movie */
router.delete("/:id", async (request, response) => {
  // get movie id
  const movie_id = request.params.id;
  // delete the movie
  const deletedMovie = await Movie.findByIdAndDelete(movie_id);
  response.send(deletedMovie);
});

module.exports = router;
