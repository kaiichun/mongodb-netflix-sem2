const database = "netflix";
const collection = "tvshows";

// Create a new database.
use(database);

// Create a new collection.
// db.createCollection(collection);

// add data
db.tvshows.insertMany([
  {
    title: "Breaking Bad",
    creator: "Vince Gilligan",
    premiere_year: 2008,
    end_year: 2013,
    seasons: 5,
    genre: ["Crime", "Drama"],
    rating: 9.5,
  },
  {
    title: "Game of Thrones",
    creator: "David Benioff, D.B. Weiss",
    premiere_year: 2011,
    end_year: 2019,
    seasons: 8,
    genre: ["Action", "Adventure", "Drama"],
    rating: 9.3,
  },
  {
    title: "Stranger Things",
    creator: "The Duffer Brothers",
    premiere_year: 2016,
    seasons: 3,
    genre: ["Drama", "Fantasy", "Horror"],
    rating: 8.7,
  },
  {
    title: "The Crown",
    creator: "Peter Morgan",
    premiere_year: 2016,
    seasons: 4,
    genre: ["Biography", "Drama", "History"],
    rating: 8.7,
  },
  {
    title: "Black Mirror",
    creator: "Charlie Brooker",
    premiere_year: 2011,
    seasons: 5,
    genre: ["Drama", "Sci-Fi", "Thriller"],
    rating: 8.8,
  },
  {
    title: "The Office (US)",
    creator: "Greg Daniels, Ricky Gervais, Stephen Merchant",
    premiere_year: 2005,
    end_year: 2013,
    seasons: 9,
    genre: ["Comedy"],
    rating: 8.9,
  },
  {
    title: "Sherlock",
    creator: "Mark Gatiss, Steven Moffat",
    premiere_year: 2010,
    seasons: 4,
    genre: ["Crime", "Drama", "Mystery"],
    rating: 9.1,
  },
  {
    title: "Westworld",
    creator: "Jonathan Nolan, Lisa Joy",
    premiere_year: 2016,
    seasons: 3,
    genre: ["Drama", "Mystery", "Sci-Fi"],
    rating: 8.6,
  },
  {
    title: "Fargo",
    creator: "Noah Hawley",
    premiere_year: 2014,
    seasons: 4,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.9,
  },
  {
    title: "Peaky Blinders",
    creator: "Steven Knight",
    premiere_year: 2013,
    seasons: 6,
    genre: ["Crime", "Drama"],
    rating: 8.8,
  },
]);
