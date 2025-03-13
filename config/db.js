const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Database connection
const connectDB = () => {
  mongoose.connect(process.env.mongo_url)
    .then(() => {
      console.log("Server connected to MongoDB: 200 OK");
    })
    .catch((err) => {
      console.error(`Error connecting to MongoDB: ${err.message}`);
      process.exit(1); // Exit the process with failure
    });
};

module.exports = connectDB;
