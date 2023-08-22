const express = require("express");
const router = express.Router();

// import model into router
const tvshow = require("../models/tvshow");

// list all the tvshows
router.get("/", async (request, response) => {
  const { genre, rating, premiere_year } = request.query;
  let filter = {};

  if (genre || rating || premiere_year) {
    if (genre) {
      filter.genre = genre;
    }
    if (rating) {
      filter.rating = { $gt: rating };
    }
    if (premiere_year) {
      filter.premiere_year = { $gt: premiere_year };
    }
    response.send(await tvshow.find(filter));
  }
});

// get specific tvshows by id
router.get("/:id", async (request, response) => {
  const findtvshow = await tvshow.findOne({ _id: request.params.id });
  response.send(findtvshow);
});

module.exports = router;
