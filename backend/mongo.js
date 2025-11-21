const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb://mongo:${password}@tramway.proxy.rlwy.net:10048/phoneBookApp?authSource=admin`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phoneBookSchema);

(async () => {
  try {
    if (process.argv.length === 3) {
      const result = await Person.find({});
      console.log('Phonebook:');
      result.forEach(person => console.log(`${person.name} ${person.number}`));
    } else {
      const person = new Person({ name: process.argv[3], number: process.argv[4] });
      const result = await person.save();
      console.log(`added ${result.name} number ${result.number} to phonebook`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
