import mongoose from "mongoose";

const Schema = mongoose.Schema;

const favouriteSchema = new Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    imdbRating: String,
    language: String,
    plot: String,
    runtime: String,
    released: String,
  },
  { timestamps: true }
);

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: {
    type: [favouriteSchema],
    required: false,
  },
});

export default mongoose.model("User", userSchema);
