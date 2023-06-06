const mongoose = require("mongoose");

const InfrastructureSchema = mongoose.Schema(
  {
    InfraName: {
      type: String,
      required: true,
    },
    Detail: { type: String, required: true },
    Images: [{ data: Buffer, contentType: String, Name: String }],
  },
  {
    timestamps: true,
  }
);

const Infrastructure = mongoose.model("Infrastructure", InfrastructureSchema);

module.exports = Infrastructure