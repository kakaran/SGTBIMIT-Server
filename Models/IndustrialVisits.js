const mongoose = require('mongoose');

const IndustrialVisitSchema = new mongoose.Schema({
    name: String,
    about: String,
    image: {
        data: Buffer, 
        contentType: String,
    },
    companyImage: {
        data: Buffer, 
        contentType: String,
    },
},{timestamps: true}
);

module.exports = mongoose.model("IndustrialVisit",IndustrialVisitSchema);