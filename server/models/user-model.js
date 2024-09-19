const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({

    fullname:{
        type:String,
        require:true,

    },

    username:{
        type:String,
        require:true,

    },
    email: {
        type:String,
        require:true,

    },
    phone:{
        type:String,
        require:true,

    },
    password:{
        type:String,
        require:true,

    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});

userSchema.methods.generateToken = async function() {//instances method

    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRECT_KEY,{
            expiresIn:"30d",
        }
    
    );
        
    } catch (error) {
        console.error(error);
    }

};


const User = new mongoose.model("User", userSchema);

module.exports = User;