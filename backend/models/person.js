require('dotenv').config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGO_URL;

console.log("Connecting to", url);

const connectDB = (async () => {
  try {
    const response = await mongoose.connect(url, { family: 4 });
    if (response) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
})();

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = {
  Person: mongoose.model('Person', personSchema),
  connectDB
};