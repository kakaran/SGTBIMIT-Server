import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;



app.get("/", function(req,res) {
    return res.status(200).send("Everthing is working fine --");
})


app.listen(PORT, function(error) {
    if (error) {
        console.log(`Error in started srever!`);
    }
    console.log(`Server started successfully on PORT ${PORT}`);
})