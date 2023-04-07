const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({

    name : {
        type : String,
        require : true,
    },
    name1 : {
        type : String,
        require : true,
    },

},{timestamps : true}
);

module.exports = mongoose.model("Calender", calendarSchema);