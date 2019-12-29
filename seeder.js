const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env var
dotenv.config({ path: "./config/config.env" });

//load models
const Bootcamp = require("./models/Bootcamp");

//Connted DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Read json
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//import data into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported...".green.inverse);
  } catch (err) {
    console.log(err);
  }
};

//delete data from DB

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destroyed...".red.inverse);
  } catch (err) {
    console.log(err);
  }
};

//execution handler
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
