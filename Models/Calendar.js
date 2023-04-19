const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({

    Date : {
        type : String,
        required : true,
    },
    Event : {
        type : String,
        required : true,
    },

},{timestamps : true}
);

module.exports = mongoose.model("Calender", calendarSchema);