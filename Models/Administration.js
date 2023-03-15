const mongoose = require('mongoose');
const administration = mongoose.Schema({
    name :{
        type : String,
    },
    image : {
        type : String,
    },
    position : {
        type : String,
    },
    shortNote : {
        type : String,
    },
    longNote :{
        type : String,
    }
},{
    timestamps : true,
});


const Administrations = mongoose.model("Administrations",administration);

module.exports = Administrations;
