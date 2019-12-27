//import libs
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

//custom Logger middleware
// const logger = require("./middleware/logger");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Route files
const bootcamps = require("./routes/bootcamps");

//Initalize mongo
connectDB();

//Initialize express
const app = express();

//Body Parser
app.use(express.json());

//mount custom logger middleware
// app.use(logger);

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

//mount error handler middleware
app.use(errorHandler);

//Define port
const PORT = process.env.PORT || 5000;

//express serve
const server = app.listen(
  PORT,
  console.log(
    `Server is runnning in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close Server & exit process
  server.close(() => process.exit(1));
});
