const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      min: 1800,
      max: 2099,
    },
  },
  {
    timestamps: true, //this will add createdAt and updatedAt as fields in our schema
  }
);
// export const Book = mongoose.model("Book", bookSchema);
module.exports= Book = mongoose.model('Book',bookSchema)
