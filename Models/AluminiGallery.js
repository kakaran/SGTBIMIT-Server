const mongoose = require("mongoose");

const Aluminigallery = new mongoose.Schema({
 
    image : {
        data : Buffer,
        contentType : String,        
    },
    category : {
        type : String,
        require : true,        
    },  
    images: [{ data: Buffer, contentType: String }]        
        
}, {timestamps : true}
);

module.exports = mongoose.model("Alumini", Aluminigallery);