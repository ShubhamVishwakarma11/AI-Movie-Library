import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// creating express app
const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});

//connect to db
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI || "";

mongoose.set("strictQuery", true);
mongoose
  .connect(uri)
  .then(() => {
    // listening for requests
    app.listen(port, () => {
      console.log(`Server started on port ${port} !!!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
