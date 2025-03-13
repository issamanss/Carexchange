const { checkSchema } = require("express-validator");
const post_visibility = require("../../utils/post_visibility");
const validatePost = checkSchema({
    "address.country": {
        notEmpty: { errorMessage: "Country is required" },
        isString: { errorMessage: "Country must be a string" }
    },
    "address.street": {
        notEmpty: { errorMessage: "Street is required" },
        isString: { errorMessage: "Street must be a string" }
    },
    "address.city": {
        notEmpty: { errorMessage: "City is required" },
        isString: { errorMessage: "City must be a string" }
    },
    "address.description": {
        optional: true,
        isString: { errorMessage: "Description must be a string" }
    },
    "car.category": {
        notEmpty: { errorMessage: "Car category is required" },
        isString: { errorMessage: "Car category must be a string" }
    },
    "car.brand": {
        notEmpty: { errorMessage: "Car brand is required" },
        isString: { errorMessage: "Car brand must be a string" }
    },
    "car.name": {
        notEmpty: { errorMessage: "Car name is required" },
        isString: { errorMessage: "Car name must be a string" }
    },
    "car.color": {
        notEmpty: { errorMessage: "Car color is required" },
        isString: { errorMessage: "Car color must be a string" }
    },
    "car.year": {
        notEmpty: { errorMessage: "Car year is required" },
        isInt: { errorMessage: "Car year must be a number" },
        isLength: { options: { min: 4, max: 4 }, errorMessage: "Car year must be 4 digits" }
    },
    "car.description": {
        optional: true,
        isString: { errorMessage: "Car description must be a string" }
    },
    "car.miles": {
        optional: true,
        isInt: { errorMessage: "Miles must be a number", options: { min: 0 } }
    },
    "car.url": {
        optional: true,
        isURL: { errorMessage: "URL must be a valid link" }
    },
    "car.price": {
        notEmpty: { errorMessage: "Price is required" },
        isFloat: { errorMessage: "Price must be a number", options: { min: 0 } }
    },
    "pictures": {
        optional: true,
        isArray: { errorMessage: "Pictures must be an array" }
    },
    "pictures.*": {
        isURL: { errorMessage: "Each picture must be a valid URL" }
    },
    "visibility": {
        optional: true,
        isIn: { options: [[post_visibility.public, post_visibility.private]], errorMessage: "Visibility must be 'public' or 'private'" }
    }
});

module.exports = {validatePost};
