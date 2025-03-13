const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    country: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String }
});

module.exports = AddressSchema; // Export schema only (Embedded in Posts)