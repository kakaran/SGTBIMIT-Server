const mongoose = require("mongoose");

const researchAnddevlpmtSchema = new mongoose.Schema({
    Detail : String,
    Date: String,
    Category: {
        category : {
            type : String,
            require : true
        },
        index : {
            type : Number,
            require : true,
        }
    },
    image: {
        data : Buffer,
        contentType: String,
    },
    images : [{
        data: Buffer,
        contentType : String,
    }],
},{timestamps : true}
)

module.exports = mongoose.model("Research&Development", researchAnddevlpmtSchema);