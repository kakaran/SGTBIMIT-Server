const mongoose = require('mongoose');


const PlacementSchema = new mongoose.Schema({
    image: { data: Buffer, contentType: String, Name: String },
    Year : [{
        year : {
            type : String,
        },
        Courses : [{
            Course : String,
            MPackage : String,
            AvPackage : String,
            
        }]
    }]
},{
    timestamps : true
});

const Placement = mongoose.model("Placement",PlacementSchema);


module.exports = Placement;