import express from "express";
import {
  addFavourite,
  getAllFavourites,
} from "../controller/favouriteController";

const router = express.Router();

// get all favourites
router.get("/", getAllFavourites);

// get a favourite movie
router.get("/:movieId", () => {});

// add a new favourite movie
router.post("/", addFavourite);

// delete a favourite movie
router.delete("/:movieId", () => {});

export default router;
