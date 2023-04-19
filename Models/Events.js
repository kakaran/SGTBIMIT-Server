const mongoose = require('mongoose');

const EventScheema = mongoose.Schema({
    mainImage : {
        data : Buffer,
        contentType : String,
        Name : String
    },
    name : {
        type : String,
        required : true
    },
    year : {
        type : String,
    },
    eventHandler : {
        type : String
    },
    detail : {
        type : String
    },
    Images : [{data : Buffer, contentType : String, Name : String}]
},{
    timestamps : true
})

const Event = mongoose.model("Event",EventScheema);

module.exports = Event;