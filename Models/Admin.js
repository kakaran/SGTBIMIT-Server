const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
        // unique : true,
    },
    phoneNo : {
        type : Number,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
},{timestamps : true}
);

module.exports = mongoose.model("Admin", adminSchema);