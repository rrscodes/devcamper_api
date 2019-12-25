const express = require("express");
const dotenv = require("dotenv");

//Route files
const bootcamps = require("./routes/bootcamps");

//load env vars
dotenv.config({ path: "./config/config.env" });

//Initialize express
const app = express();

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is runnning in ${process.env.NODE_ENV} mode on ${PORT}`)
);
