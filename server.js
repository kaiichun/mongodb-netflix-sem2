const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create an instance of express
const app = express();

// middleware to handle JSON request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup the cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,PSOT,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB Connected Success..."))
  .catch((err) => console.log(err));

// routes
const movieRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");
const newreviewRouter = require("./routes/newreview");

app.use("/movies", movieRouter);
app.use("/tvshows", tvshowRouter);
app.use("/reviews", newreviewRouter);

app.get("/", (request, response) => {
  response.send(
    "<a href='/movies'>Movies</a> <br/> <a href='/tvshows'>TV Show</a>"
  );
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
