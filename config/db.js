const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
// mongoose.set('useFindAndModify', false);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });

    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
