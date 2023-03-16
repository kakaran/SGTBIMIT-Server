const mongoose = require("mongoose");
const placeInter = mongoose.Schema({
    name :{
        type : String
    },
    image : {
        type : String
    },
    companyName :{
        type: String
    }
},{
    timestamps : true
});

const PlaceInter = mongoose.model("PlaceInter",placeInter);

module.exports = PlaceInter;