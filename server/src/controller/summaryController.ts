import { Request, Response } from "express";
import Summary from "../models/summaryModel";

export const getAISummary = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const summary = await Summary.findById(movieId);

    if (!summary) {
      const newSummary = await Summary.create({
        _id: movieId,
        movieId,
        summary: "This is a demo summary",
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
