const mongoose = require("mongoose");

const Eventgallery = new mongoose.Schema({
 
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

module.exports = mongoose.model("Event", Eventgallery);