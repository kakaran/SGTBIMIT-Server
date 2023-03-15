import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 5000;




//env
import dotenv from 'dotenv';
dotenv.config();



app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));




//database
import dbConnect from "./Config/dbConfig.js";
dbConnect();



//routes
import userRoute from "./Routes/xyz.js";
app.use("/",userRoute);




//just for checking
// app.get("/", function(req,res) {
//     return res.status(200).send("Everthing is working fine --");
// })



app.listen(PORT, function(error) {
    if (error) {
        console.log(`Error in started srever!`);
    }
    console.log(`Server started successfully on PORT ${PORT}`);
})