const { verifyToken } = require("../utils/jwt");

exports.validateSession = (req, res, next) => {
  try {
    let token = req.headers["Authorization"] || req.headers["authorization"];
    if (!token) throw new Error("Auth failed", token);
    let payload = verifyToken(token);
    req.user = payload;
    next()
  } catch (e) {
    return res.status(401).jsonp({ error: true, message: "Auth failed" });
  }
};
