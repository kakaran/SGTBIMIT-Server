const mongoose = require("mongoose");
const testimonial = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    detail :{
        type : String,
        required : true
    }
},
{
    timestamp : true
});

const Testimonial = mongoose.model("Testimonial",testimonial);

module.exports = Testimonial;