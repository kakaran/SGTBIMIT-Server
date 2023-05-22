const mongoose = require('mongoose');

const PlacementTeamSchema = new mongoose.Schema({
    Name : {
        type : String
    },
    Image : {
        data  : Buffer,
        contentType : String,
        Name : String
    },
    linkdin : {
        type : String
    },
    Categories : {
        type : Number,
        default : 1
    }

});

const PlacementTeam = mongoose.model("PlacementTeam", PlacementTeamSchema);

module.exports = PlacementTeam