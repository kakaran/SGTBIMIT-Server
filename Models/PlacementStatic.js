const mongoose = require('mongoose');

const PlacementStaticSchema = mongoose.Schema({
    Year : Number,
    Course : [
        {
            Name : String,
            Eligible : Number,
            Offers : Number
        }
    ]
})

const PlacementStatic = mongoose.model("PlacementStatic",PlacementStaticSchema);

module.exports = PlacementStatic;