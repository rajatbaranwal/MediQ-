const hosUser = require("../models/hos-model");
const bcrypt = require("bcryptjs");



const hosregister = async (req, res) => {
    try {
        const { hospitalName, email, contact, address,  password } = req.body;

        // Log the incoming registration data
        console.log("Incoming registration data:", req.body);

        // Check if the user with this email already exists
        const userExist = await hosUser.findOne({ email });
        if (userExist) {
            console.log("User with this email already exists.");
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new hosUser({
            hospitalName,
            email,
            contact,
            address,
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

const hossignin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userExist = await hosUser.findOne({email});
        console.log(userExist);
        if(!userExist){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
    
        const user = await bcrypt.compare(password, userExist.password);
        if(user){
            res.status(200).json({msg: "login sucessful", token: await userExist.generateToken(), userId: userExist._id.toString(),});
        }
        else{
            res.status(401).json({msg:"Invalid Password or email"});
        }
    } catch (error) {
       res.status(500).json(  "Internal Server Error" );
       //next(error);
    }
    }







module.exports = { hosregister, hossignin};