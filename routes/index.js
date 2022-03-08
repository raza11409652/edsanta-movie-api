const appRoutes = require("express").Router();
const authRoutes = require("./authRoutes");
const fileRoutes = require("./fileRoutes");
const movieRoutes = require("./movieRoutes");

appRoutes.use("/file", fileRoutes);
appRoutes.use("/movie", movieRoutes);
appRoutes.use("/auth", authRoutes);
module.exports = appRoutes;
