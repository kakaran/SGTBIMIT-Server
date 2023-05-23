const mongoose = require("mongoose");

const faculty = mongoose.Schema({

    name :{
        type : String,
    },
    post : {
        type : String
    },
    image : {
        data : Buffer,
        contentType : String,
        Name : String,
    },
    detail : {
        type : String
    },
    Department : {
        type : String,
    },
    Index : {
        type : Number
    }
}, {
    timestamps : true
});


const Facultys = mongoose.model("Faculty",faculty);

module.exports = Facultys;