const mongoose = require("mongoose");

const faculty = mongoose.Schema({

    name :{
        type : String,
    },
    post : {
        type : String
    },
    image : {
        type : String
    },
    detail : {
        type : String
    }
}, {
    timestamps : true
});


const Facultys = mongoose.model("Faculty",faculty);

module.exports = Facultys;