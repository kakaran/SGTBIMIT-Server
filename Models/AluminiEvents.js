const mongoose = require("mongoose");

const AluminiEventSchema = mongoose.Schema({
  Name: String,
  Year: Number,
  Images: [{ data: Buffer, contentType: String, Name: String }],
  Detail: String,
  Image: { data: Buffer, contentType: String, Name: String },
});

const AluminEvent = mongoose.model("AluminiEvent", AluminiEventSchema);

module.exports = AluminEvent;
