const AuthController = require("../controller/authController");

const authRoutes = require("express").Router();

authRoutes.post("/", AuthController.login);

module.exports = authRoutes;
