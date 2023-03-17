const mongoose = require('mongoose');

const recruiters = mongoose.Schema({
    image : {
        type : String
    }

},{
    timestamps : true
});

const Recruiters = mongoose.model("Recruiter",recruiters);

module.exports = Recruiters