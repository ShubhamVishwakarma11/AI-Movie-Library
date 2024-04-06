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

    const searchResult = response.data.Search.map(
      (movie: {
        Title: string;
        Year: string;
        Type: string;
        Poster: string;
        imdbID: string;
      }) => ({
        title: movie.Title,
        year: movie.Year,
        type: movie.Type,
        img: movie.Poster,
        movieId: movie.imdbID,
      })
    );
    return res.status(200).json({ status: "success", data: searchResult });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ status: "error", error: "Error in search" });
  }
};
