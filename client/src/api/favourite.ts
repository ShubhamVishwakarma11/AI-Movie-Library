import { BACKEND_URL } from "@/constants";
import customAxios from "@/lib/customAxios";

export const addFavouriteMovie = async (movieId: string, token: string) => {
  try {
    const options = {
      url: `${BACKEND_URL}/favourite`,
      method: "post",
      data: { movieId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await customAxios(options);
    console.log("data", response.newFav);
    return response.newFav;
  } catch (error) {
    console.error("ERROR", error);
  }
};

export const getAllFavouriteMovies = async (token: string) => {
  try {
    const options = {
      url: `${BACKEND_URL}/favourite`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await customAxios(options);
    console.log("data", response.favourites);
    return response.favourites;
  } catch (error) {
    console.error("ERROR", error);
  }
};

export const getAFavouriteMovie = async (movieId: string, token: string) => {
  try {
    const options = {
      url: `${BACKEND_URL}/favourite/${movieId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await customAxios(options);
    console.log("data", response.favourite);
    return response.favourite;
  } catch (error) {
    console.error("ERROR", error);
  }
};

export const removeFavouriteMovie = async (movieId: string, token: string) => {
  try {
    const options = {
      url: `${BACKEND_URL}/favourite/${movieId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await customAxios(options);
    console.log("data", response.newFav);
    return response.newFav;
  } catch (error) {
    console.error("ERROR", error);
  }
};
