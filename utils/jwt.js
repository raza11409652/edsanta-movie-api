const jwt = require("jsonwebtoken");
let secret = process.env.SECRET_AUTH;
exports.generateToken = ({ payload }) => {
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    throw new Error(e);
  }
};
