const Movie = require("../models/movie");
class MovieService {
  /**
   * Insert movie data into DB
   * @param {*} option
   * @returns
   */
  async insertMovie(option) {
    try {
      let x = new Movie(option);
      return await x.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * get movies records using filter
   * @param {*} filter
   * @param {*} limit
   * @param {*} skip
   * @returns
   */
  async getMovies(filter, limit, skip) {
    try {
      let count = await Movie.count(filter);
      let records = await Movie.find(filter)
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort({ name: 1 });
      return { count, records };
    } catch (er) {
      throw new Error(e);
    }
  }

  async deleteMovie(id) {
    return await Movie.findByIdAndDelete(id);
  }
}
module.exports = MovieService;
