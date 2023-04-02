const mongoose = require('mongoose');
const administration = mongoose.Schema({
    name :{
        type : String,
    },
    image : {
        data : Buffer,
        contentType : String,
        Name : String,
    },
    position : {
        type : String,
    },
    shortNote : {
        type : String,
    },
    longNote :{
        type : String,
    },
    Index :{
        type : Number
    }
},{
    timestamps : true,
});


const Administrations = mongoose.model("Administrations",administration);

module.exports = Administrations;
