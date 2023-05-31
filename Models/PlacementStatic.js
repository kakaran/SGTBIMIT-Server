const mongoose = require('mongoose');

const PlacementStaticSchema = new mongoose.Schema({
    Year: Number,
    Course: [
        {
            Name: String,
            Eligible: Number,
            Offers: Number,
            Percentage: Number,
        }
    ]
})

const PlacementStatic = mongoose.model("placementstatics", PlacementStaticSchema);

module.exports = PlacementStatic;