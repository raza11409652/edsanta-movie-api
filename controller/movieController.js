const MovieService = require("../services/movieService");
const { getPagination, getPagingData } = require("../utils/pagination");
const movieService = new MovieService();
class MovieController {
  async newMovie(req, res) {
    try {
      let movie = await movieService.insertMovie(req.body);
      return res.jsonp({ error: false, message: "Movie added", movie });
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.message });
    }
  }

  async allMovies(req, res) {
    try {
      let { query, page, size } = req.query;
      let { limit, skip } = getPagination(page, size);
      let filter = {};
      if (query) {
        filter = { ...filter, name: { $regex: query, $options: "i" } };
      }
      let { records, count } = await movieService.getMovies(
        filter,
        limit,
        skip
      );
      let response = getPagingData(count, page, limit, records);
      return res.jsonp(response);
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.message });
    }
  }

  /**
   * Delete any single movie by ID
   * @param {*} req
   * @param {*} res
   */
  async deleteMovieById(req, res) {
    try {
      let movieId = req.params.id;
      let data = await movieService.deleteMovie(movieId);
      if (!data)
        return res.status(404).jsonp({ error: true, message: "Not Found" });
      return res.jsonp({ error: false, message: "Deleted" });
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.message });
    }
  }
}
module.exports = MovieController;
