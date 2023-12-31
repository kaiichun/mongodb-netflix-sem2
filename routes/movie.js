const express = require("express");
const router = express.Router();

// import model into router
const Movie = require("../models/movie");

/* list all the movies */
router.get("/", async (request, response) => {
  try {
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
    response.status(200).send(await Movie.find(filter).sort({ _id: -1 }));
  } catch (error) {
    response.status(400).send({ message: error._message });
  }

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
  try {
    const data = await Movie.findOne({ _id: request.params.id });
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* create new movie route */
router.post("/", async (request, response) => {
  // request.params;
  // request.query;
  // request.body;
  // request.send("ok");

  // create a placeholder for a new movie
  try {
    const newMovie = new Movie({
      title: request.body.title,
      director: request.body.director,
      release_year: request.body.release_year,
      genre: request.body.genre,
      rating: request.body.rating,
    });
    // save the movie into mongodb
    await newMovie.save();
    response.status(200).send(newMovie);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* update a movie */
router.put("/:id", async (request, response) => {
  try {
    // get movie id
    const movie_id = request.params.id;
    // update the movie
    const updatedMovie = await Movie.findByIdAndUpdate(movie_id, request.body, {
      new: true,
    });
    response.status(200).send(updatedMovie);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* delete a movie */
router.delete("/:id", async (request, response) => {
  try {
    // get movie id
    const movie_id = request.params.id;
    // delete the movie
    const deletedMovie = await Movie.findByIdAndDelete(movie_id);
    response.status(200).send(deletedMovie);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* method 1  */
// post review
router.post("/:id/reviews", async (request, response) => {
  try {
    // get movie id
    const movie_id = request.params.id;
    // find the movie
    const movie = await Movie.findById(movie_id);
    // create a new review and add it to the movie's reviews field
    const newReview = {
      username: request.body.username,
      email: request.body.email,
      content: request.body.content,
      rating: request.body.rating,
    };
    movie.reviews.push(newReview);
    // save the movie data
    await movie.save();
    // send out the updated movie data
    response.status(200).send(newReview);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

// get one movie's review
router.get("/:id/reviews", async (request, response) => {
  try {
    // get movie id
    const movie_id = request.params.id;
    // find the movie
    const movie = await Movie.findById(movie_id);
    response.status(200).send(movie.reviews);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

module.exports = router;
