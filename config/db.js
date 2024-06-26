const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${connection.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`.bgRed); // Log the actual error message
    process.exit(1);
  }
};

module.exports = connectDB;
