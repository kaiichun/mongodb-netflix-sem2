const express = require("express");
const router = express.Router();

const Newreview = require("../models/newreview");

// get all the reviews (regardless of movie or tvshow)
router.get("/", async (request, response) => {
  try {
    response
      .status(200)
      .send(await Newreview.find().populate("movie").populate("tvshow"));
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

// create new review for movie
router.post("/movie/:id", async (request, response) => {
  try {
    // get movie id
    const movie_id = request.params.id;
    // create a new review
    const newReview = new Newreview({
      movie: movie_id,
      username: request.body.username,
      email: request.body.email,
      content: request.body.content,
      rating: request.body.rating,
    });
    // save the review data
    await newReview.save();
    // send out the review data
    response.status(200).send(newReview);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

// create new review for tvshow
router.post("/tvshow/:id", async (request, response) => {
  try {
    // get tvshow id
    const tvshow_id = request.params.id;
    // create a new review
    const newReview = new Newreview({
      tvshow: tvshow_id,
      username: request.body.username,
      email: request.body.email,
      content: request.body.content,
      rating: request.body.rating,
    });
    // save the review data
    await newReview.save();
    // send out the review data
    response.status(200).send(newReview);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

module.exports = router;
