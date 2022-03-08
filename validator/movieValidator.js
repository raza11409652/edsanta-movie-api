const { body, validationResult } = require("express-validator");

exports.createMovie = [
  body("name").isString().withMessage("Movie name is required"),
  body("duration")
    .isNumeric({ no_symbols: true })
    .withMessage("Movie duration is required"),
  body("image").isBase64().withMessage("Movie image must be base 64"),
  body("filmCast")
    .isArray({ min: 1 })
    .withMessage("Film cast should be an array,Minimum  1 is required"),
  async (req, res, next) => {
    let errors = validationResult(req).array();
    if (errors.length > 0)
      return res
        .status(400)
        .jsonp({ error: true, message: errors[0].msg, errors });
    next();
  },
];
