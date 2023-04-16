const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
Name :{
    type : String,
    require :true,
    // max : 10,
},
Email : {
    type : String,
    require : true
},
PNumber : {
    type : String,
    require : true,
    max : 10,
},
Course : {
    type : String,
    require : true,
    enum: ["BCA", "BBA", "BBA B&I", "BCOM"]
}
},{
    timestamps : true,
});

const Admission = mongoose.model("Admissions", AdmissionSchema);

module.exports = Admission;