const express = require("express");
const router = express.Router();

// import model into router
const tvshow = require("../models/tvshow");

/* list all the tvshows */
router.get("/", async (request, response) => {
  const { premiere_year, genre, rating } = request.query;
  let filter = {};
  if (genre || rating || premiere_year) {
    if (genre) {
      filter.genre = { $in: genre.split(",") }; // { genre: { $in: genre } }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { rating: { $gt: rating } }
    }
    if (premiere_year) {
      filter.premiere_year = { $gt: premiere_year }; // { premiere_year: { $gt: release_year } }
    }
  }
  const list = await tvshow.find(filter);
  response.send(list);
});

/* get specific tvshow by id */
router.get("/:id", async (request, response) => {
  const data = await tvshow.findOne({ _id: request.params.id });
  response.send(data);
});

module.exports = router;
