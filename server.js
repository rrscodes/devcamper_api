//import libs
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Route files
const bootcamps = require("./routes/bootcamps");

//custom Logger middleware
// const logger = require("./middleware/logger");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Initialize express
const app = express();

//mount custom logger middleware
// app.use(logger);

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

//Define port
const PORT = process.env.PORT || 5000;

//express serve
app.listen(
  PORT,
  console.log(`Server is runnning in ${process.env.NODE_ENV} mode on ${PORT}`)
);
