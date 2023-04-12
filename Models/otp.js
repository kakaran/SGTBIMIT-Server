const mongoose = require("mongoose");

const otpschema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    code : {
        type : Number,
        required : true,
    },
    expireIn : {
        type : Number,
        required : true
    }
},
{
    timestamps : true
});

const otp = mongoose.model("otp", otpschema);

module.exports = otp;