const mongoose = require("mongoose");

const aluminiTestimonials = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    detail :{
        type : String,
        required : true
    },
    image : {
       data : Buffer,
       contentType : String,
    },
},{timestamps:true}

);

module.exports  = mongoose.model("AluminiTestimonial",aluminiTestimonials)