const mongoose = require("mongoose");
const testimonial = mongoose.Schema({
    name: {
        type : String
    },
    detail :{
        type : String
    }
},
{
    timestamp : true
});

const Testimonial = mongoose.model("Testimonial",testimonial);

module.exports = Testimonial;