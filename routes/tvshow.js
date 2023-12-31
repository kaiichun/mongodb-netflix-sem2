const express = require("express");
const router = express.Router();

// import model into router
const Tvshow = require("../models/tvshow");

/* list all the tvshows */
router.get("/", async (request, response) => {
  try {
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
    const list = await Tvshow.find(filter);
    response.send(list);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* get specific tvshow by id */
router.get("/:id", async (request, response) => {
  try {
    const data = await Tvshow.findOne({ _id: request.params.id });
    response.send(data);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* create new TvShow route */
router.post("/", async (request, response) => {
  try {
    // create a placeholder for a new TvShow
    const newTvShow = new Tvshow({
      title: request.body.title,
      creator: request.body.creator,
      premiere_year: request.body.premiere_year,
      end_year: request.body.end_year,
      seasons: request.body.seasons,
      genre: request.body.genre,
      rating: request.body.rating,
    });
    // save the TvShow into mongodb
    await newTvShow.save();
    response.send(newTvShow);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* update a tvshow */
router.put("/:id", async (request, response) => {
  try {
    // get tvshow id
    const tvshow_id = request.params.id;
    // update the tvshow
    const updatedTvshow = await Tvshow.findByIdAndUpdate(
      tvshow_id,
      request.body,
      {
        new: true,
      }
    );
    response.send(updatedTvshow);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

/* delete a tvshow */
router.delete("/:id", async (request, response) => {
  try {
    // get tvshow id
    const tvshow_id = request.params.id;
    // delete the tvshow
    const deletedTvshow = await Tvshow.findByIdAndDelete(tvshow_id);
    response.send(deletedTvshow);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

module.exports = router;
