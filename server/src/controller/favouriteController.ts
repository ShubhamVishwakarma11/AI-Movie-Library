import { Request, Response } from "express";
import User from "../models/userModel";

export const getAllFavourites = async (req: Request, res: Response) => {
  try {
    const locals = req.locals;
    const user_id = locals._id;
    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res
        .status(500)
        .json({ status: "error", error: "User doesn't exist" });
    }

    const favourites = user?.favourites;
    return res.status(200).json({ status: "success", data: { favourites } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Error in fetching favourites" });
  }
};

export const addFavourite = async (req: Request, res: Response) => {
  try {
    const locals = req.locals;
    const user_id = locals._id;
    const { movieId, title, genre, year } = req.body;

    const newFav = await User.findByIdAndUpdate(
      user_id,
      { $push: { favourites: { movieId, title, genre, year } } },
      { new: true }
    );

    if (!newFav) {
      console.log("ERROR: ", newFav, user_id);
      return res
        .status(500)
        .json({ status: "error", error: "Error in adding favourite movie" });
    }

    return res.status(200).json({ status: "success", data: { newFav } });
  } catch (error) {
    console.log("ERROR: ", error);
    return res
      .status(500)
      .json({ status: "error", error: "Error in adding favourite movie" });
  }
};
