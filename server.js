const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();

// middleware to handle JSON request
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB Connected Success..."))
  .catch((err) => console.log(err));

// routes
const movieRouter = require("./routes/movie");
app.use("/movies", movieRouter);

const tvshowRouter = require("./routes/tvshow");
app.use("/tvshows", tvshowRouter);

app.get("/", (request, response) => {
  response.send(
    "<a href='/movies'>Movies</a> <br/> <a href='/tvshows'>TV Show</a>"
  );
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
