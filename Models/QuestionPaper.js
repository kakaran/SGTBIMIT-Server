const mongoose = require("mongoose");

const questionPaper = mongoose.Schema({
    course: {
        type: String,
        required: true,
        enum: ["BCA", "BBA", "BBA B&I", "BCOM"]
    },
    Year: {
        type: Number,
        require: true
    },
    Semester: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6]
    },
    file: [{ data: Buffer, contentType: String, Name: String }]
}, {
    timestamps: true,
})

const QuestionPaper = mongoose.model("QuestionPaper", questionPaper);

module.exports = QuestionPaper;