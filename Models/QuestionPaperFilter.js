const mongoose = require('mongoose');

const paperFilter = new mongoose.Schema({
    course: {
        type: String,
        enum: ["BCA", "BBA", "BBA B&I", "BCOM"]
    },
    Years: [
        {
            year: { type: String, require: true },
            Semesters: [
                {
                    Semester: { type: Number, require: true, enum: [1, 2, 3, 4, 5, 6] },
                },
            ],
        },
    ],
}, {
    timestamps: true,
})

const PaperFilter = mongoose.model("PaperFilters", paperFilter);

module.exports = PaperFilter