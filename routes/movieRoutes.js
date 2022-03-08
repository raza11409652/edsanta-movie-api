const { createMovie } = require("../validator/movieValidator");
let MovieController = require("../controller/movieController");
const { validateSession } = require("../middleware/auth");
let movie = new MovieController();
const movieRoutes = require("express").Router();
movieRoutes.post("/", validateSession, createMovie, movie.newMovie);
movieRoutes.get("/", validateSession, movie.allMovies);
movieRoutes.delete("/:id", validateSession, movie.deleteMovieById);

module.exports = movieRoutes;
