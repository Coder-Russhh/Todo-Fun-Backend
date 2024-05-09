const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes.js")
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const userProfileRoutes = require("./routes/userProfileRoutes")

const app = express();

// dotenv 
dotenv.config()

// establishing POrt frome env
const PORT = process.env.PORT;
// console.log(PORT)

// connect to mongoDB
connectDB();

// middleware using
app.use(express.json());

// todos routes setup
app.use("/api",todoRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",userProfileRoutes)

app.get("/", (req, res) => {
  res.send("Hello ji mein aagya backend se");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`.bgBlue);
});
