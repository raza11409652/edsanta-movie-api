const { generateToken } = require("../utils/jwt");

class AuthController {
  static async login(req, res) {
    try {
      let name = req.body["name"];
      if (!name) throw new Error("Name is required");
      let payload = { name: name };
      let token = generateToken({ payload });
      return res.jsonp({ error: false, token });
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.message });
    }
  }
}
module.exports = AuthController;
