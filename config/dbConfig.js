const mongoose = require("mongoose");
let uri = process.env.MONGO_URL;
const dbConnect = (response) => {
  mongoose
    .connect(uri)
    .then((data) => {
      response(true);
    })
    .catch((er) => {
      response(er);
    });
};

module.exports = dbConnect;
