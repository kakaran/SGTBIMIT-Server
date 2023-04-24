const mongoose = require("mongoose");
const testimonial = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    detail :{
        type : String,
        required : true
    },
    Year :{
        type : Number,
        required :true
    },
    Course :{
        type : String,
        required : true
    },
    image : {
        data : Buffer,
        contentType : String,
        Name : String,
    }
},
{
    timestamp : true
});

const Testimonial = mongoose.model("Testimonial",testimonial);

module.exports = Testimonial;