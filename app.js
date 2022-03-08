const express = require("express");
const dotEnv = require("dotenv");
dotEnv.config();
const dbConnect = require("./config/dbConfig");
const appRoutes = require("./routes");
//express app
const app = express();
//PORT
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));

dbConnect((res) => {
  if (res) console.log("DB connected");
  else process.exit(0);
});

app.use("/v1", appRoutes);
app.listen(PORT, () => {
  console.log(`server is up at port ${PORT}`);
});
