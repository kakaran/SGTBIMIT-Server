const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
Name :{
    type : String,
    required :true,
    // max : 10,
},
Email : {
    type : String,
    required : true
},
PNumber : {
    type : String,
    required : true,
    max : 10,
},
Course : {
    type : String,
    required : true,
    enum: ["BCA", "BBA", "BBA B&I", "BCOM"]
}
},{
    timestamps : true,
});

const Admission = mongoose.model("Admissions", AdmissionSchema);

module.exports = Admission;