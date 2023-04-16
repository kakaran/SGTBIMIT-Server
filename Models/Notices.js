const mongoose = require('mongoose');

const NoticesSchema = new mongoose.Schema({
Name : {
    type : String,
},
Detail : {
    type : String,
},
Categories : {
    type : String,
    enum : ["Important","Normal"]
},
file : {
    data : Buffer,
    contentType :String,
    Name : String
}
},{
    timestamps : true
});

const Notice = mongoose.model("Notices",NoticesSchema);

module.exports = Notice;
