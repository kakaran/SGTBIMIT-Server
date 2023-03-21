const mongoose = require('mongoose');

const society = mongoose.Schema({

    title : {
        type :String,
    },
    image :{
        type : String
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