const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require ('path');
const app = express();
const PORT = process.env.PORT || 5000;



//env
const dotenv = require('dotenv');
dotenv.config();
const publicpath = path.join(__dirname,"./Public/Images");

app.use('/Public/Images',express.static(publicpath));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));




//database
const dbConnect = require("./Config/dbConfig.js");
dbConnect();



//routes
const userRoute = require("./Routes/xyz.js");
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