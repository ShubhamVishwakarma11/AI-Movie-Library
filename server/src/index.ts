import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/user";
import searchRoutes from "./routes/search";
import favouriteRoutes from "./routes/favourites";
import { useAuth } from "./middlewares/auth";

// creating express app
const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/favourite", useAuth, favouriteRoutes);
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
