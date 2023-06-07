const mongoose = require("mongoose");
const InfraLifeSchema = mongoose.Schema(
  {
    Image: {
      data: Buffer,
      contentType: String,
      Name: String,
    },
  },
  { timestamps: true }
);

const InfraLife = mongoose.model("InfraLife", InfraLifeSchema);

module.exports = InfraLife;
