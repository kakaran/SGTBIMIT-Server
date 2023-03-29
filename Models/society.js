const mongoose = require('mongoose');

const society = mongoose.Schema({

    title : {
        type :String,
    },
    image : {
        data : Buffer,
        contentType : String,
        Name : String,
    },
    subdetail : {
        type : String
    },
    detail : {
        type : String
    }
},{
    timestamps : true
});

const Society = mongoose.model("Society",society);

module.exports = Society;