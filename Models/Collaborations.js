const mongoose = require('mongoose');

const CollaborationsSchema = mongoose.Schema({
    name : {
        type : String
    },
    image : {data : Buffer, contentType : String,Name : String}
},{
    timestamps : true
});

const Collaborations = mongoose.model("Collaborations",CollaborationsSchema);

module.exports = Collaborations;