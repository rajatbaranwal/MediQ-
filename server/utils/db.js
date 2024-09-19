require("dotenv").config();

const mongoose = require("mongoose");

//const URI  = "mongodb://127.0.0.1:27017/Hospital";
//mongoose.conect(URI);
const URI = process.env.MONGODB_URI;
const connectdb = async()=>{

    try {
        await mongoose.connect(URI);
        console.log("connection successful to DB");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }

};

module.exports = connectdb;