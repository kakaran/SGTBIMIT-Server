const mongoose = require('mongoose');

const recruiters = mongoose.Schema({
    image : {
        data : Buffer,
        contentType : String,
        Name : String,
    },
    Name :{
        type : String
    }

},{
    timestamps : true
});

const Recruiters = mongoose.model("Recruiter",recruiters);

module.exports = Recruiters