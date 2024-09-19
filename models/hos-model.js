const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  // Uncommented

const hosuserSchema = new mongoose.Schema({

    hospitalName: {
        type: String,
        required: true,  // Fixed typo
    },

    email: {
        type: String,
        required: true,  // Fixed typo
    },

    contact: {
        type: String,
        required: true,  // Fixed typo
    },

    address: {
        type: String,
        required: true,  // Fixed typo
    },

    password: {
        type: String,
        required: true,  // Fixed typo
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// Method to generate JWT token
hosuserSchema.methods.generateToken = async function() {
    try {
        // Add the secret key and expiration
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,  // Ensure this is set in your .env file
            { expiresIn: "30d" }  // Add expiration time
        );
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};

const hosUser = mongoose.model("hosUser", hosuserSchema);

module.exports = hosUser;
