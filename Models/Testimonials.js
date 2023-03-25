const mongoose = require("mongoose");
const testimonial = mongoose.Schema({
    name: {
        type : String,
        require : true
    },
    detail :{
        type : String,
        require : true
    }
},
{
    timestamp : true
});

const Testimonial = mongoose.model("Testimonial",testimonial);

module.exports = Testimonial;