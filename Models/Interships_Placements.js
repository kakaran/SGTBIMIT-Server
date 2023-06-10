const mongoose = require("mongoose");
const placeInter = mongoose.Schema({
    name :{
        type : String
    },
    image : {
        data : Buffer,
        contentType : String,
        Name : String,
    },
    companyName :{
        type: String
    },
    package : Number
},{
    timestamps : true
});

const PlaceInter = mongoose.model("PlaceInter",placeInter);

module.exports = PlaceInter;