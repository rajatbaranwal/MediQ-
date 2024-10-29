const cors = require('cors');
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const hosRoute = require("./router/hos-router");
const contactRoute = require("./router/contact-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
    origin: "https://medi-q-frontend.vercel.app",  // Allow the entire frontend domain
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/auth", hosRoute);

app.use(errorMiddleware);
app.use("/api/form", contactRoute);




// app.get("/", (req, res)=>{
//         res.status(200).send("Welcome to My chanel");
//     });
//     app.get("/register", (req, res)=>{
//         res.status(200).send("Welcome to registration page");
//     });

    const PORT = process.env.PORT || 3000;
    connectDb().then(()=>{


        

app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
});
    });
