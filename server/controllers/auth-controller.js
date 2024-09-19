const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Home route
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to My Channel i.e. Rajat Baranwal Channel786");
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};

// Register route
const register = async (req, res) => {
    try {
        const { fullname, username, email, phone, password } = req.body;

        // Log the incoming registration data
        console.log("Incoming registration data:", req.body);

        // Check if the user with this email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            console.log("User with this email already exists.");
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            fullname,
            username,
            email,
            phone,
            password: hashedPassword
        });

        // Save the user to the database
        const userCreated = await newUser.save();

        // Log success and send a response with the token and userId
        console.log("User registered successfully:", userCreated);
        res.status(200).json({
            msg: "User registered successfully",
            token: await userCreated.generateToken(), // assuming generateToken is a method in your User model
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.error("Error during registration:", error); // Log the error
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Login route

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists by email
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Log the incoming password and the hashed password for comparison
        console.log("Provided password:", password);
        console.log("Hashed password:", userExist.password);

        // Manually compare passwords using bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, userExist.password);

        // Log the comparison result
        console.log("Password comparison result:", isPasswordCorrect);

        if (isPasswordCorrect) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ msg: "Invalid Password or email" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = { home, register, login };
