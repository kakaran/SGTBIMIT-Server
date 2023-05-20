const mongoose = require('mongoose');

const RegistrationSchema = mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    MNumber: {
        type: Number,
        required: true,
        // max : 11,
    },
    Address: {
        type: String,
        required: true,

    },
    AdhaarNo: {
        type: Number,
        required: true,
        // max : 13,
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Not Prefer"]
    },
    HigerEducation: {
        course: {
            type: String,
            required: true,
            enum: ["BCA", "BBA", "BBA B&I", "BCOM"]
        },
        Year: {
            type: Number,
            required: true,
            // max : 4
        },
        employed: {
            type: String,
            enum: ["Yes", "No"]
        }
    },
    CurrentWorking: {
        placement: {
            type: String,
            enum: ["Yes", "No"]
        },
        presentOrgani: {
            type: String,
        },
        CurrentDesignation: {
            type: String,
        }
    }
}, {
    timestamps: true
});


const Registration = mongoose.model("Registration", RegistrationSchema);


module.exports = Registration;