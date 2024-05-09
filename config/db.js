const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully".bgGreen);
  } catch (error) {
    console.log(`Error connecting to database: error.message`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDB;
