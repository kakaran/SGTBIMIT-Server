const mongoose = require("mongoose");

const researchAnddevlpmtSchema = new mongoose.Schema(
  {
    Detail: String,
    Date: String,
    category: {
      type: String,
      require: true,
    },
    heading : String,
    index: {
      type: Number,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Research&Development",
  researchAnddevlpmtSchema
);
