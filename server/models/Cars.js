const mongoose = require("mongoose");


const carSchema = new mongoose.Schema(
  {
    Car_name: String,
    Origin: String,
    Brand: String,
    Horsepower: Number,
    Cylinders: Number,
    Year_made: Number,
    Engine: String,
    Electric: String,

    Brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    Origin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Origin",
    },

  },
  { timestamps: true }
);

carSchema.index({'$**': 'text'});
module.exports = mongoose.model("Cars", carSchema);