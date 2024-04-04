import axios from "axios";
import { Request, Response } from "express";

export const searchController = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.params;
    const options = {
      method: "GET",
      url: "https://www.omdbapi.com/",
      params: { apikey: process.env.OMDB_API_KEY, s: searchTerm },
    };
    const response = await axios.request(options);

    if (response.statusText !== "OK") {
      return res
        .status(500)
        .json({ status: "error", error: "Error in search" });
    }
    return res
      .status(200)
      .json({ status: "success", data: response.data.Search });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ status: "error", error: "Error in search" });
  }
};
