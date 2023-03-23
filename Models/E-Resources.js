const moongose = require("mongoose");

const eResources = moongose.Schema({
  name :{
    type : String
  },
  url:{
    type : String
  }
},{
  timestamps : true
});

const EResources = moongose.model("EResources",eResources);

module.exports = EResources;