const mongoose = require("mongoose");

// Define Car Schema
const CarSchema = new mongoose.Schema({
    category: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String },
    miles: { type: Number },
    url: { type: String }, // Image URL for the car
    price: { type: Number, required: true }
});

// Export Schema (NOT Model)
module.exports = CarSchema;
