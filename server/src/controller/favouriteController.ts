import { Request, Response } from "express";
import User from "../models/userModel";
import axios from "axios";

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

export const getFavouriteMovie = async (req: Request, res: Response) => {
  try {
    const locals = req.locals;
    const { movieId } = req.params;
    const user_id = locals._id;
    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res
        .status(500)
        .json({ status: "error", error: "User doesn't exist" });
    }

    const favourite = user?.favourites?.find((fav) => fav.movieId === movieId);

    return res.status(200).json({
      status: "success",
      data: { favourite },
    });
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
    const { movieId } = req.body;

    const options = {
      method: "GET",
      url: "https://www.omdbapi.com/",
      params: { apikey: process.env.OMDB_API_KEY, i: movieId, plot: "full" },
    };

    const response = await axios.request(options);

    if (response.statusText !== "OK") {
      return res
        .status(500)
        .json({ status: "error", error: "Unable to add movie to favourites" });
    }

    const omdbData = response.data;

    const newFav = await User.findByIdAndUpdate(
      user_id,
      {
        $push: {
          favourites: {
            movieId,
            title: omdbData.Title,
            genre: omdbData.Genre,
            year: omdbData.Year,
            img: omdbData.Poster,
            type: omdbData.Type,
            imdbRating: omdbData.imdbRating,
            language: omdbData.Language,
            plot: omdbData.Plot,
            runtime: omdbData.Runtime,
            released: omdbData.Released,
          },
        },
      },
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

export const removeFavouriteMovie = async (req: Request, res: Response) => {
  try {
    const locals = req.locals;
    const user_id = locals._id;
    const { movieId } = req.params;

    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res
        .status(500)
        .json({ status: "error", error: "User doesn't exist" });
    }

    const newFav = await User.findByIdAndUpdate(user_id, {
      $pull: { favourites: { movieId } },
    });

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
      .json({ status: "error", error: "Error in removing favourite movie" });
  }
};
