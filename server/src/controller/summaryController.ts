import { Request, Response } from "express";
import Summary from "../models/summaryModel";
import User from "../models/userModel";
import { generateAISummary } from "../utils/generateAISummary";

export const getAISummary = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const summary = await Summary.findById(movieId);

    if (!summary) {
      const locals = req.locals;
      const user_id = locals._id;
      const user = await User.findOne({ _id: user_id });

      if (!user) {
        return res
          .status(500)
          .json({ status: "error", error: "User doesn't exist" });
      }

      const favourite = user?.favourites?.find(
        (fav) => fav.movieId === movieId
      );

      const aiSummary = await generateAISummary(favourite);

      const newSummary = await Summary.create({
        _id: movieId,
        movieId,
        summary: aiSummary,
      });

      return res
        .status(200)
        .json({ status: "success", data: { summary: newSummary.summary } });
    }

    return res
      .status(200)
      .json({ status: "success", data: { summary: summary.summary } });
  } catch (error) {
    console.log("ERROR: ", error);
    return res
      .status(500)
      .json({ status: "error", error: "Error in generating AI summary" });
  }
};
