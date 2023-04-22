const mongoose = require('mongoose');

const PlacementFeatureSchema = new mongoose.Schema({
    image: { data: Buffer, contentType: String, Name: String },
    Name: {
        type: String,
        required: true
    },
    Course : {
        type : String,
        required :  true,
        enum: ["BCA", "BBA", "BBA B&I", "BCOM"]
    },
    CompanyImage : { data: Buffer, contentType: String, Name: String }
}, {
    timestamps: true
});


const PlacementFeature = mongoose.model("PlacementFeaturesStar", PlacementFeatureSchema);

module.exports = PlacementFeature;