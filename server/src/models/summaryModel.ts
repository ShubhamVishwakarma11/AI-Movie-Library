import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SummarySchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Summary", SummarySchema);
