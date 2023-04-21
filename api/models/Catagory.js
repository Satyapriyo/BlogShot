const mongoose = require("mongoose");
const CatagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catagory", CatagorySchema);
