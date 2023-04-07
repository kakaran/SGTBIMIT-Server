const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({

    Date : {
        type : String,
        require : true,
    },
    Event : {
        type : String,
        require : true,
    },

},{timestamps : true}
);

module.exports = mongoose.model("Calender", calendarSchema);