const mongoose = require("mongoose");


const SummerInternshipSchema = new mongoose.Schema({

    companyName : String,
    companyDetail : String,
    partnershipWith : String,
    internshipOffered : [String],
    companyImage : {
        data:Buffer,
        contentType: String,
    },
    topInterns : [{
        studName : String,
        studYear : Number,
        internshipIn : String,
        studImage : {data:Buffer,contentType: String},
    }],
    
},{timestamps : true});

module.exports = mongoose.model("summerInternship",SummerInternshipSchema);